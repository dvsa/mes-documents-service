import { completedCatBTest } from './test-data.mock';
import { INextUploadBatch } from '../../domain/next-upload-batch.interface';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

import { injectable } from 'inversify';
import { cloneDeep } from 'lodash';

@injectable()
export class NextUploadBatchMock implements INextUploadBatch {

  get = (batchSize: number = 250): Promise<TestResultSchemasUnion[]> => {
    const data: TestResultSchemasUnion[] = [];

    for (let i = 0 ; i < batchSize; i = i + 1) {
      const result: TestResultSchemasUnion = cloneDeep(completedCatBTest);
      result.journalData.applicationReference.applicationId =
      result.journalData.applicationReference.applicationId + 1;
      data.push(result);
    }

    return Promise.resolve(data);
  };
}
