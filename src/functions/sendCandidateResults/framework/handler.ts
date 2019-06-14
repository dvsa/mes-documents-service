import { container } from './di/inversify.config';
import { TYPES } from './di/types';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { IRequestScheduler } from './request-scheduler';
import { INextUploadBatch } from '../domain/next-upload-batch.interface';

export async function handler() {
  // TODO -  Use Real Service + get batch size from config
  let testResults: StandardCarTestCATBSchema[];
  const nextUploadBatch = container.get<INextUploadBatch>(TYPES.INextUploadBatch);

  try {
    console.log('### handler ####');
    testResults = await nextUploadBatch.get();
    console.log('### test results ###');
    console.log(testResults);

    const requestScheduler: IRequestScheduler = container.get<IRequestScheduler>(TYPES.IRequestScheduler);
    requestScheduler.scheduleRequests(testResults);
  } catch (err) {
    console.log('### Error in handler ####');
    console.log(err);
    throw(err);
  }
}
