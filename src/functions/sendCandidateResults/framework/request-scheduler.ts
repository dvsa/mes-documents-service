import bottleneck from 'bottleneck';
import { debug, error, warn } from '@dvsa/mes-microservice-common/application/utils/logger';
import { get } from 'lodash';
import { inject, injectable } from 'inversify';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CommunicationMethod, TestResultCommonSchema } from '@dvsa/mes-test-schema/categories/common';

import { IConfigAdapter } from './adapter/config/config-adapter.interface';
import { DocumentsServiceError } from '../domain/errors/documents-service-error';
import { TYPES } from './di/types';
import { INotifyClient } from '../domain/notify-client.interface';
import { ITemplateIdProvider } from '../application/service/template-id-provider';
import { sendNotification } from '../application/service/send-notification';
import { IPersonalisationProvider } from '../application/service/personalisation-provider';
import { IStatusUpdater } from './status-updater';
import { ProcessingStatus } from '../domain/submission-outcome.model';
import { NOTIFY_INTERFACE } from '../domain/interface.constants';
import isDelegatedTest from '../application/service/is-delegated-test';
import { getTestOutcome, isFail, isPass } from '../application/service/test-outcome';
import { Language } from '../domain/conducted-language';
import { PersonalisationDetails } from '../domain/personalisation.model';
import { Correspondence } from '../domain/template-id.model';

export interface IRequestScheduler {
  scheduleRequests(testResults: TestResultSchemasUnion[]): Promise<void>[];
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
      // No limit on concurrent requests
      maxConcurrent: null,
      // No time waited between each request
      minTime: 0,
      // Maximum of 250 requests in the queue (max batch size)
      highWater: this.configAdapter.notifyBatchSize,
      // Ignore any additions to the queue when we reach the max batch size
      strategy: bottleneck.strategy.BLOCK,
      // Amount of jobs the queue can perform at the start of the queue
      reservoir: this.configAdapter.notifyRequestsPerBatch,
      // How often to add new jobs to the queue (every second)
      reservoirRefreshInterval: 1000,
      // How many jobs to add to the queue each refresh
      reservoirRefreshAmount: this.configAdapter.notifyRequestsPerBatch,
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

  scheduleRequests(testResults: TestResultSchemasUnion[]): Promise<void>[] {
    return testResults.map((testResult: TestResultSchemasUnion) => {
      const applicationReference = formatApplicationReference(testResult.journalData.applicationReference);

      return this.limiter
        .schedule(
          {id: applicationReference.toString()},
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
        .then(async () => {
          debug('SendNotifyRequest success - calling update status', applicationReference);

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
        .catch(async (err) => {
          error('SendNotifyRequest failure - calling update status', applicationReference, err);

          await this.statusUpdater.updateStatus({
            applicationReference,
            outcomePayload: {
              interface: NOTIFY_INTERFACE,
              state: ProcessingStatus.FAILED,
              staff_number: testResult.journalData.examiner.staffNumber,
              retry_count: this.retryCountByApplicationRef[applicationReference] || 0,
              error_message: err.message,
            },
          });
        });
    });
  }

  private sendNotifyRequest(testResult: TestResultSchemasUnion): Promise<any> {
    const appRef = formatApplicationReference(testResult.journalData?.applicationReference).toString();

    if (!testResult.communicationPreferences) {
      warn('Notify request rejected: Missing communicationPreferences', appRef);
      return Promise.reject();
    }

    if (!testResult.communicationPreferences.communicationMethod) {
      warn('Notify request rejected: Missing communicationMethod', appRef);
      return Promise.reject();
    }

    if (!isFail(testResult.activityCode) && !isPass(testResult.activityCode)) {
      debug('Notify not required: Terminated test', appRef);
      return Promise.resolve();
    }

    if (isDelegatedTest(testResult)) {
      debug('Notify not required: Delegated test', appRef);
      return Promise.resolve();
    }

    const {communicationPreferences} = testResult as Required<TestResultCommonSchema>;

    const templateId: string =
      this.templateIdProvider.getTemplateId(communicationPreferences?.communicationMethod as CommunicationMethod);

    debug('Using templateId', templateId, appRef);

    return Promise.all([
      ...this.sendEmailToPADI(testResult, templateId),
      sendNotification(
        communicationPreferences.updatedEmail as string,
        <CommunicationMethod>communicationPreferences.communicationMethod,
        templateId,
        this.personalisationProvider.getPersonalisationDetails(testResult),
        appRef,
        '',
        this.notifyClient,
        testResult?.communicationPreferences?.conductedLanguage === 'Cymraeg' ? Language.WELSH : Language.ENGLISH,
        getTestOutcome(testResult.activityCode),
      )]
    );
  }

  private sendEmailToPADI = (testResult: TestResultSchemasUnion, templateId: string): Promise<any>[] => {
    if (
      (testResult.category === TestCategory.ADI3 || testResult.category === TestCategory.SC)
      // Due to FE now displaying 'Current' attempt instead of 'Previous', we are decreasing the rule from 3 -> 2
      && get(testResult, 'journalData.candidate.previousADITests') === 2
      && isFail(testResult.activityCode)
    ) {
      const recipients: string[] = (process.env.PADI_EMAIL || '').split(',');
      const personalisation: PersonalisationDetails =
        this.personalisationProvider.getPersonalisationDetails(testResult);
      const appRef: string = formatApplicationReference(testResult.journalData.applicationReference).toString();

      debug('Sending Email to PADI', appRef);

      return recipients.map((recipient) => {
        return sendNotification(
          recipient,
          Correspondence.EMAIL,
          templateId,
          personalisation,
          appRef,
          '',
          this.notifyClient,
          testResult?.communicationPreferences?.conductedLanguage === 'Cymraeg' ? Language.WELSH : Language.ENGLISH,
          getTestOutcome(testResult.activityCode),
          true,
        );
      });
    }
    return [];
  };
}
