import { container } from './di/inversify.config';
import { TYPES } from './di/types';
import { getUploadBatch } from './__mocks__/get-upload-batch.mock';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { IRequestScheduler } from './request-scheduler';

export function handler() {
  // TODO -  Use Real Service + get batch size from config
  const testResults: StandardCarTestCATBSchema []  = getUploadBatch(250);

  const requestScheduler: IRequestScheduler = container.get<IRequestScheduler>(TYPES.IRequestScheduler);

  requestScheduler.scheduleRequests(testResults);
}
