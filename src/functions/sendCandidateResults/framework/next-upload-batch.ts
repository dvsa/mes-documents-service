import { injectable, inject } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import * as zlib from 'zlib';
import { error, info } from '@dvsa/mes-microservice-common/application/utils/logger';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

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

  get(): Promise<TestResultSchemasUnion[]> {
    const { resultsBaseApiUrl } = this.configAdapter;
    return axios.get(
      `${resultsBaseApiUrl}/test-results/upload?interface=${NOTIFY_INTERFACE}&batch_size=${this.batchSize}`,
    ).then((response: AxiosResponse): TestResultSchemasUnion[] => {
      const parseResult = response.data as string[];
      const resultList: TestResultSchemasUnion[] = [];

      info(`Successfully read batch of ${parseResult.length}`);

      parseResult.forEach((element: string) => {
        let uncompressedResult: string = '';
        let test: TestResultSchemasUnion;

        try {
          uncompressedResult = zlib.gunzipSync(Buffer.from(element, 'base64')).toString();
        } catch (e) {
          return new TestResultError('failed decompressing test result');
        }

        try {
          test = JSON.parse(uncompressedResult);
          resultList.push(test);
        } catch (e) {
          error('Failed to parse test result', uncompressedResult);
          return new TestResultError('failed parsing test result');
        }
      });
      return resultList;
    });
  }
}
