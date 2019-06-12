import bottleneck from 'bottleneck';
import { sendEmail } from '../application/service/send-email';
import { DocumentsServiceError } from '../domain/errors/documents-service-error';
import { EmailPersonalisation, LetterPersonalisation } from '../domain/personalisation.model';
import { sendLetter } from '../application/service/send-letter';
import { INotifyClient } from '../domain/notify-client.interface';
import { container } from './di/inversify.config';
import { TYPES } from './di/types';
import { NotifyClientStub } from '../application/stub/notify-client-stub';
import { getUploadBatch } from './__mocks__/get-upload-batch.mock';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { getEmailTemplateId, getLetterTemplateId } from '../application/service/get-template-id';
import { Config } from './adapter/config/config-provider';

export async function handler() {
  // TODO -  Use Real Service + get batch size from config
  const testResults: StandardCarTestCATBSchema []  = getUploadBatch(250);

  const limiter = new bottleneck({
    maxConcurrent: null,                 // No limit on concurrent requests
    minTime: 0,                          // No time waited between each request
    highWater: 250,                      // Maximum of 250 requests in the queue (max batch size)
    strategy: bottleneck.strategy.BLOCK, // Ignore any additions to the queue when we reach the max batch size
    reservoir: 25,                       // Amount of jobs the queue can perform at the start of the queue
    reservoirRefreshInterval: 1000,      // How often to add new jobs to the queue (every second)
    reservoirRefreshAmount: 25,          // How many jobs to add to the queue each refresh

  });

  limiter.on('failed', onFailed);

  const notifyClient = container.get<INotifyClient>(TYPES.INotifyClient);

  testResults.forEach((testResult: StandardCarTestCATBSchema) => {
    limiter
      .schedule(() => sendNotifyRequest(testResult, notifyClient))
        .then(success => console.log('success', success)) // TODO - Tell Database test result has been sent
        .catch(error => console.log('error', error)); // TODO - Tell Database test result has not been sent
  });
}

function onFailed(error: DocumentsServiceError, jobInfo: bottleneck.EventInfoRetryable): Promise<number> | void {
  const config: Config = new Config();
  if (error.shouldRetry && jobInfo.retryCount < config.retryLimit) {
    return new Promise<number>(resolve => resolve(0));
  }
}

function sendNotifyRequest(testResult: StandardCarTestCATBSchema, notifyClient: INotifyClient): Promise<any>  {
  // TODO - Need to add some better saftey around these - throw 500 error if they are missing
  const apiKey = process.env.NOTIFY_API_KEY || '';

  if (!testResult.communicationPreferences) {
    return Promise.reject();
  }

  if (testResult.communicationPreferences.communicationMethod === 'Email') {
    const templateId: string =
      getEmailTemplateId(
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
    return sendEmail('example@example.com', templateId, data, 'fake-ref', '', notifyClient);
  }

  const templateId: string = getLetterTemplateId(
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

  return sendLetter(templateId, data, 'fake-ref', notifyClient);
}
