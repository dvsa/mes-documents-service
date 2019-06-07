import bottleneck from 'bottleneck';
import { NotifyClient } from 'notifications-node-client';
import { sendEmail } from '../application/service/send-email';

export async function handler() {
    // TODO - This needs to be gotten from the post
  const testResults = [...Array(1).keys()];

  // TODO - Make configurable
  const maximumRetries: number = 2;

  const limiter = new bottleneck({
    maxConcurrent: null,                 // No limit on concurrent requests
    minTime: 0,                          // No time waited between each request
    highWater: 250,                      // Maximum of 250 requests in the queue (max batch size)
    strategy: bottleneck.strategy.BLOCK, // Ignore any additions to the queue when we reach the max batch size
    reservoir: 25,                       // Amount of jobs the queue can perform at the start of the queue
    reservoirRefreshInterval: 1000,      // How often to add new jobs to the queue (every second)
    reservoirRefreshAmount: 25,          // How many jobs to add to the queue each refresh

  });

  limiter.on('failed', (error: any, jobInfo: bottleneck.EventInfoRetryable): Promise<number> | void => {
    if (jobInfo.retryCount < maximumRetries) {
      return new Promise<number>(resolve => resolve(0));
    }
  });

  testResults.forEach((testResult) => {
    limiter
    .schedule(() => sendNotifyRequest(testResult))
    .then(success => console.log('success')) // TODO - Tell Database test result has been sent
    .catch(error => console.log('error', error)); // TODO - Tell Database test result has not been sent
  });
}

function sendNotifyRequest(testResult: any): Promise<any>  {

  const isLocal = process.env.IS_LOCAL || false;
  const useNotify = process.env.USE_NOTIFY || false;
  const apiKey = process.env.NOTIFY_API_KEY;

  if (!isLocal && !useNotify) {
    logTestResult(testResult);
    return Promise.resolve();
  }

  let notifyClient: any;

  isLocal ?
    notifyClient = new NotifyClient(apiKey) :
    notifyClient = new NotifyClient(apiKey);

  return sendEmail('', '', {}, notifyClient);

}

function logTestResult(testResult: any) {
    // TODO - Log to cloudwatch
  console.log('Log to CloudWatch');

}
