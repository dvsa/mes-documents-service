import bottleneck from 'bottleneck';
import { IConfigAdapter } from './adapter/config/config-adapter.interface';
import { DocumentsServiceError } from '../domain/errors/documents-service-error';
import { inject, injectable } from 'inversify';
import { TYPES } from './di/types';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { INotifyClient } from '../domain/notify-client.interface';
import { ITemplateIdProvider } from '../application/service/template-id-provider';
import { sendEmail } from '../application/service/send-email';
import { sendLetter } from '../application/service/send-letter';
import { IPersonalisationProvider } from '../application/service/personalisation-provider';
import { IStatusUpdater } from './status-updater';
import { ProcessingStatus } from '../domain/submission-outcome.model';
import { NOTIFY_INTERFACE } from '../domain/interface.constants';

export interface IRequestScheduler {
  scheduleRequests(testResults: StandardCarTestCATBSchema[]): Promise<void>[];
}

@injectable()
export class RequestScheduler implements IRequestScheduler {

  public limiter: bottleneck;

  constructor(
    @inject(TYPES.IConfigAdapter) private configAdapter: IConfigAdapter,
    @inject(TYPES.INotifyClient) private notifyClient: INotifyClient,
    @inject(TYPES.ITemplateIdProvider) private templateIdProvider: ITemplateIdProvider,
    @inject(TYPES.IPersonalisationProvider) private personalisationProvider: IPersonalisationProvider,
    @inject(TYPES.IStatusUpdater) private statusUpdater: IStatusUpdater,
  ) {
    this.limiter = new bottleneck({
      maxConcurrent: null,                 // No limit on concurrent requests
      minTime: 0,                          // No time waited between each request
      highWater: 250,                      // Maximum of 250 requests in the queue (max batch size)
      strategy: bottleneck.strategy.BLOCK, // Ignore any additions to the queue when we reach the max batch size
      reservoir: 25,                       // Amount of jobs the queue can perform at the start of the queue
      reservoirRefreshInterval: 1000,      // How often to add new jobs to the queue (every second)
      reservoirRefreshAmount: 25,          // How many jobs to add to the queue each refresh
      trackDoneStatus: true,
    });

    this.limiter.on('failed', this.onLimiterFailed);
  }

  scheduleRequests(testResults: StandardCarTestCATBSchema[]): Promise<void>[] {
    return testResults.map((testResult: StandardCarTestCATBSchema) => {
      return this.limiter
        .schedule(
          { expiration: this.configAdapter.notifyTimeout },
          () => this.sendNotifyRequest(testResult))
          .then(async(success) => {
            await this.statusUpdater.updateStatus({
              applicationReference: testResult.journalData.applicationReference.applicationId,
              outcomePayload: {
                interface: NOTIFY_INTERFACE,
                state: ProcessingStatus.ACCEPTED,
                staff_number: testResult.journalData.examiner.staffNumber,
                retry_count: 0, // TODO - Need to set retry count somehow
                error_message: null,
              },
            });
          })
          .catch(async(error) => {
            await this.statusUpdater.updateStatus({
              applicationReference: testResult.journalData.applicationReference.applicationId,
              outcomePayload: {
                interface: NOTIFY_INTERFACE,
                state: ProcessingStatus.FAILED,
                staff_number: testResult.journalData.examiner.staffNumber,
                retry_count: 0, // TODO - Need to set retry count somehow
                error_message: error,
              },
            });
          });
    });
  }

  private sendNotifyRequest(testResult: StandardCarTestCATBSchema): Promise < any > {
    if (!testResult .communicationPreferences) {
      return Promise.reject();
    }

    if (testResult.communicationPreferences.communicationMethod === 'Email') {
      const templateId: string =
      this.templateIdProvider.getEmailTemplateId(
          testResult.communicationPreferences.conductedLanguage,
          testResult.activityCode,
        );
      return sendEmail(
        testResult.communicationPreferences.updatedEmail,
        templateId,
        this.personalisationProvider.getEmailPersonalisation(testResult),
        testResult.journalData.applicationReference.applicationId.toString(),
        '',
        this.notifyClient,
      );
    }

    const templateId: string = this.templateIdProvider.getLetterTemplateId(
      testResult.communicationPreferences.conductedLanguage,
      testResult.activityCode,
    );

    return sendLetter(
      templateId,
      this.personalisationProvider.getLetterPersonalisation(testResult),
      testResult.journalData.applicationReference.applicationId.toString(),
      this.notifyClient);
  }

  private onLimiterFailed(
    error: DocumentsServiceError,
    jobInfo: bottleneck.EventInfoRetryable,
  ): Promise<number> | void {
    if (error.shouldRetry && jobInfo.retryCount < this.configAdapter.retryLimit) {
      return new Promise<number>(resolve => resolve(0));
    }
  }

}
