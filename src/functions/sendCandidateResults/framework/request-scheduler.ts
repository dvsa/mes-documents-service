import bottleneck from 'bottleneck';
import { IConfigAdapter } from './adapter/config/config-adapter.interface';
import { DocumentsServiceError } from '../domain/errors/documents-service-error';
import { inject, injectable } from 'inversify';
import { TYPES } from './di/types';
import { StandardCarTestCATBSchema, ApplicationReference } from '@dvsa/mes-test-schema/categories/B';
import { INotifyClient } from '../domain/notify-client.interface';
import { ITemplateIdProvider, isFail, isPass } from '../application/service/template-id-provider';
import { sendEmail } from '../application/service/send-email';
import { sendLetter } from '../application/service/send-letter';
import { IPersonalisationProvider } from '../application/service/personalisation-provider';
import { IStatusUpdater } from './status-updater';
import { ProcessingStatus } from '../domain/submission-outcome.model';
import { NOTIFY_INTERFACE } from '../domain/interface.constants';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';

export interface IRequestScheduler {
  scheduleRequests(testResults: StandardCarTestCATBSchema[]): Promise<void>[];
}

@injectable()
export class RequestScheduler implements IRequestScheduler {

  public limiter: bottleneck;

  private retryCountByApplicationRef: { [applicationReference: string]: number } = {};

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

    this.limiter.on(
      'failed',
      (error: DocumentsServiceError, jobInfo: bottleneck.EventInfoRetryable): Promise<number> | void => {
        if (error.shouldRetry && jobInfo.retryCount < this.configAdapter.retryLimit) {
          return new Promise<number>(resolve => resolve(0));
        }
      });

    this.limiter.on(
      'retry',
      (error: any, jobInfo: any): void => {
        const oldRetryCount = jobInfo.retryCount;
        this.retryCountByApplicationRef = {
          ...this.retryCountByApplicationRef,
          [jobInfo.options.id]: oldRetryCount + 1,
        };
      });
  }

  scheduleRequests(testResults: StandardCarTestCATBSchema[]): Promise<void>[] {
    return testResults.map((testResult: StandardCarTestCATBSchema) => {
      const applicationReference = formatApplicationReference(
        testResult.journalData.applicationReference,
      );
      return this.limiter
        .schedule(
          { id: applicationReference.toString() },
          () => Promise.race([
            this.sendNotifyRequest(testResult),
            new Promise((resolve, reject) => {
              setTimeout(
                reject,
                this.configAdapter.notifyTimeout,
                new DocumentsServiceError(0, 'timed out', true),
              );
            }),
          ]))
        .then(async (success) => {
          await this.statusUpdater.updateStatus({
            applicationReference,
            outcomePayload: {
              interface: NOTIFY_INTERFACE,
              state: ProcessingStatus.ACCEPTED,
              staff_number: testResult.journalData.examiner.staffNumber,
              retry_count: this.retryCountByApplicationRef[applicationReference] || 0,
              error_message: null,
            },
          });
        })
        .catch(async (error) => {
          await this.statusUpdater.updateStatus({
            applicationReference,
            outcomePayload: {
              interface: NOTIFY_INTERFACE,
              state: ProcessingStatus.FAILED,
              staff_number: testResult.journalData.examiner.staffNumber,
              retry_count: this.retryCountByApplicationRef[applicationReference] || 0,
              error_message: error.message,
            },
          });
        });
    });
  }

  private sendNotifyRequest(testResult: StandardCarTestCATBSchema): Promise<any> {
    if (!testResult.communicationPreferences) {
      return Promise.reject();
    }

    if (!isFail(testResult.activityCode) && !isPass(testResult.activityCode)) {
      return Promise.resolve();
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
        formatApplicationReference(testResult.journalData.applicationReference).toString(),
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
      formatApplicationReference(testResult.journalData.applicationReference).toString(),
      this.notifyClient);
  }
}
