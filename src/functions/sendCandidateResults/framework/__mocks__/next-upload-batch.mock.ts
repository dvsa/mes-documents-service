import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { completedCatBTest } from './test-data.mock';
import { INextUploadBatch } from '../../domain/next-upload-batch.interface';
import { injectable } from 'inversify';

@injectable()
export class NextUploadBatchMock implements INextUploadBatch {

  get(batchSize: number = 250) {
    const data: StandardCarTestCATBSchema[] = [];

    for (let i = 0 ; i < batchSize; i = i + 1) {
      data.push(completedCatBTest);
    }

    return Promise.resolve(data);
  }
}