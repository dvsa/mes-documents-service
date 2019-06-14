import bottleneck from 'bottleneck';
import { IConfigAdapter } from './adapter/config/config-adapter.interface';
import { DocumentsServiceError } from '../domain/errors/documents-service-error';
import { inject, injectable } from 'inversify';
import { TYPES } from './di/types';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { INotifyClient } from '../domain/notify-client.interface';
import { ITemplateIdProvider } from '../application/service/template-id-provider';
import { EmailPersonalisation, LetterPersonalisation } from '../domain/personalisation.model';
import { sendEmail } from '../application/service/send-email';
import { sendLetter } from '../application/service/send-letter';

export interface IRequestScheduler {
  scheduleRequests(testResults: StandardCarTestCATBSchema[]): void;
}

@injectable()
export class RequestScheduler implements IRequestScheduler {

  private limiter: bottleneck;

  constructor(
    @inject(TYPES.IConfigAdapter) private configAdapter: IConfigAdapter,
    @inject(TYPES.INotifyClient) private notifyClient: INotifyClient,
    @inject(TYPES.ITemplateIdProvider) private templateIdProvider: ITemplateIdProvider,
  ) {
    this.limiter = new bottleneck({
      maxConcurrent: null,                 // No limit on concurrent requests
      minTime: 0,                          // No time waited between each request
      highWater: 250,                      // Maximum of 250 requests in the queue (max batch size)
      strategy: bottleneck.strategy.BLOCK, // Ignore any additions to the queue when we reach the max batch size
      reservoir: 25,                       // Amount of jobs the queue can perform at the start of the queue
      reservoirRefreshInterval: 1000,      // How often to add new jobs to the queue (every second)
      reservoirRefreshAmount: 25,          // How many jobs to add to the queue each refresh
    });

    this.limiter.on('failed', this.onLimiterFailed);
  }

  scheduleRequests(testResults: StandardCarTestCATBSchema[]): void {

    testResults.forEach((testResult: StandardCarTestCATBSchema) => {
      this.limiter
        .schedule(() => this.sendNotifyRequest(testResult))
          .then(success => console.log('success', success)) // TODO - Tell Database test result has been sent
          .catch(error => console.log('error', error)); // TODO - Tell Database test result has not been sent
    });

  }

  private sendNotifyRequest(testResult: StandardCarTestCATBSchema): Promise<any> {
    if (!testResult.communicationPreferences) {
      return Promise.reject();
    }

    if (testResult.communicationPreferences.communicationMethod === 'Email') {
      const templateId: string =
      this.templateIdProvider.getEmailTemplateId(
          testResult.communicationPreferences.conductedLanguage,
          testResult.activityCode,
        );
      // TODO - update to send real data
      const data: EmailPersonalisation = {
        'ref number': 'test ref',
        'test date' : '01/01/2019',
        'test time': '9:00',
        'first name': 'Joe',
        'cat dead' : 'was black and white',
      };
      return sendEmail(
        testResult.communicationPreferences.updatedEmail,
        templateId,
        data,
        testResult.journalData.applicationReference.applicationId.toString(),
        '',
        this.notifyClient,
      );
    }

    const templateId: string = this.templateIdProvider.getLetterTemplateId(
      testResult.communicationPreferences.conductedLanguage,
      testResult.activityCode,
    );
    // TODO - update to send real data
    const data: LetterPersonalisation = {
      address_line_1: 'The Occupier',
      address_line_2: '123 High Street',
      address_line_3: 'Richmond upon Thames',
      address_line_4: 'London',
      address_line_5: 'Middlesex',
      address_line_6: 'UK',
      postcode: 'SW14 6BH',
      'ref number': 'test ref',
      'test date' : '01/01/2019',
      'test time': '9:00',
      'first name': 'Joe',
      'cat dead' : 'was black and white',
    };

    return sendLetter(
      templateId,
      data,
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
