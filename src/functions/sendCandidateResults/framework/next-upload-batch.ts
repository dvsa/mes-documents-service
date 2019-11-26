import { injectable, inject } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import * as zlib from 'zlib';

import { INextUploadBatch } from '../domain/next-upload-batch.interface';
import { TYPES } from './di/types';
import { IConfigAdapter } from './adapter/config/config-adapter.interface';
import { TestResultError } from './errors/TestResultError';
import { NOTIFY_INTERFACE } from '../domain/interface.constants';

@injectable()
export class NextUploadBatch implements INextUploadBatch {

  batchSize: number;

  constructor(
    @inject(TYPES.IConfigAdapter) private configAdapter: IConfigAdapter,
  ) {
    this.batchSize = configAdapter.notifyBatchSize;
  }

  get() {
    const { resultsBaseApiUrl } = this.configAdapter;
    return axios.get(
      `${resultsBaseApiUrl}/test-results/upload?interface=${NOTIFY_INTERFACE}&batch_size=${this.batchSize}`,
    ).then((response: AxiosResponse): StandardCarTestCATBSchema[] => {
      const parseResult = response.data;
      const resultList: StandardCarTestCATBSchema[] = [];
      parseResult.forEach((element: string) => {
        let uncompressedResult: string = '';
        let test: StandardCarTestCATBSchema;

        try {
          uncompressedResult = zlib.gunzipSync(Buffer.from(element, 'base64')).toString();
        } catch (e) {
          return new TestResultError('failed decompressing test result');
        }

        try {
          test = JSON.parse(uncompressedResult);
          resultList.push(test);
        } catch (e) {
          return new TestResultError('failed parsing test result');
        }
      });
      return resultList;
    });
  }
}
