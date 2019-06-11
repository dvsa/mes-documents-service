import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { completedCatBTest } from './test-data.mock';

export const getUploadBatch =  (batchSize: number) : StandardCarTestCATBSchema[] => {
  const data: StandardCarTestCATBSchema[] = [];

  for (let i = 0 ; i < batchSize; i = i + 1) {
    data.push(completedCatBTest);
  }

  return data;
};
