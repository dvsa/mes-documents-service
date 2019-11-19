import { container } from './di/inversify.config';
import { TYPES } from './di/types';
import { IRequestScheduler } from './request-scheduler';
import { INextUploadBatch } from '../domain/next-upload-batch.interface';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

export async function handler() {
  let testResults: TestResultSchemasUnion[];
  const nextUploadBatch = container.get<INextUploadBatch>(TYPES.INextUploadBatch);

  try {
    testResults = await nextUploadBatch.get();
    const requestScheduler: IRequestScheduler = container.get<IRequestScheduler>(TYPES.IRequestScheduler);
    await Promise.all(requestScheduler.scheduleRequests(testResults));
  } catch (err) {
    console.log(`### err:  ${err}`);
    throw(err);
  }
}
