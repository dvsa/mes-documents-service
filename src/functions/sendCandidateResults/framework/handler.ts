import bottleneck from 'bottleneck';

export async function handler() {
    // TODO - This needs to be gotten from the post
  const testResults = [...Array(50).keys()];

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
    .catch(error => console.log('error')); // TODO - Tell Database test result has not been sent
  });
}

function sendNotifyRequest(testResult: any): Promise<any>  {

  const isLocal = process.env.IS_LOCAL || false;
  const useNotify = process.env.USE_NOTIFY || false;

  if (isLocal) {
    console.log('Use stub notify');
  }

  if (useNotify) {
    console.log('Use Gov notify');
  }

  console.log('Log to CloudWatch');
  return new Promise(resolve => resolve(1));
}
