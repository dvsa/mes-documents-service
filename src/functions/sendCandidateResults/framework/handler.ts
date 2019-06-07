import bottleneck from 'bottleneck';
import { NotifyClient } from 'notifications-node-client';
import { sendEmail } from '../application/service/send-email';
import { DocumentsServiceError } from '../domain/errors/documents-service-error';
import { EmailPersonalisation, LetterPersonalisation } from '../domain/personalisation.model';
import { sendLetter } from '../application/service/send-letter';

// TODO - Make configurable
const maximumRetries: number = 2;

export async function handler() {
    // TODO -  Need to call Get Upload Batch and use data from there + need an object to use
  const testResults = [...Array(1).keys()];

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

  testResults.forEach((testResult) => {
    limiter
      .schedule(() => sendNotifyRequest(testResult))
        .then(success => console.log('success', success)) // TODO - Tell Database test result has been sent
        .catch(error => console.log('error', error)); // TODO - Tell Database test result has not been sent
  });
}

function onFailed(error: DocumentsServiceError, jobInfo: bottleneck.EventInfoRetryable): Promise<number> | void {
  if (error.shouldRetry && jobInfo.retryCount < maximumRetries) {
    return new Promise<number>(resolve => resolve(0));
  }
}

function sendNotifyRequest(testResult: any): Promise<any>  {
  // TODO - Remove once we can tell the difference
  const isEmail: boolean = true;
  const isWelsh: boolean = false;

  const isLocal = process.env.IS_LOCAL || false;
  const useNotify = process.env.USE_NOTIFY || false;
  // TODO - Need to add some better saftey around these - throw 500 error if they are missing
  const apiKey = process.env.NOTIFY_API_KEY || '';
  const emailTemplateId = process.env.NOTIFY_EMAIL_TEMPLATE_ID || '';
  const welshEmailTemplateId = process.env.NOTIFY_EMAIL_WELSH_TEMPLATE_ID || '' ;
  const postTemplateId = process.env.NOTIFY_POST_TEMPLATE_ID || '';

  if (!isLocal && !useNotify) {
    logTestResult(testResult);
    return Promise.resolve();
  }

  let notifyClient: any;

  isLocal ?
    notifyClient = new NotifyClientStub(apiKey) : // TODO - Use Mock
    notifyClient = new NotifyClient(apiKey);

  // TODO - work out how to tell post or email
  if (isEmail) {
    // TODO - work out if it should be welsh or not
    const templateId: string = isWelsh ? welshEmailTemplateId : emailTemplateId;
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

  // TODO - work out if it should be welsh or not
  const templateId: string = postTemplateId;
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

function logTestResult(testResult: any) {
    // TODO - Log to cloudwatch
}

interface EmailAttributes {
  refNumber: string;
  testDate: string;
  testTime: string;
  firstName: string;
}

interface LetterAttributes {
  address: Address;
  refNumber: string;
  testDate: string;
  testTime: string;
  firstName: string;
}

type Address = {
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  addressLine4: string,
  addressLine5: string,
  postcode: string,
};

class NotifyClientStub {

  constructor(private apiKey: string) {

  }

  sendEmail(templateId: string, emailAddress: string, emailAttributes: EmailAttributes): Promise<any> {
    console.log('Send Email');

    console.log('templateId', templateId);
    console.log('emailAddress', emailAddress);
    console.log('emailAttributes', emailAttributes);

    return new Promise((resolve) => {
      resolve({ data: 'email sent successfully' });
    });
  }

  sendLetter(templateId: string, letterAttributes: LetterAttributes): Promise<any> {
    console.log('Send Letter');

    console.log('templateId', templateId);
    console.log('letterAttributes', letterAttributes);

    return new Promise((resolve) => {
      resolve({ data: 'letter sent successfully' });
    });
  }

}
