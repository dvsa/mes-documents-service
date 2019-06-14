import { INextUploadBatch } from '../domain/next-upload-batch.interface';
import { injectable, inject } from 'inversify';
import axios from 'axios';
import { TYPES } from './di/types';
import { IConfigAdapter } from './adapter/config/config-adapter.interface';

@injectable()
export class NextUploadBatch implements INextUploadBatch {

  interface: string = 'NOTIFY';
  batchSize: number;

  constructor(
    @inject(TYPES.IConfigAdapter) private configAdapter: IConfigAdapter,
  ) {
    this.batchSize = configAdapter.notifyBatchSize;
  }

  get() {
    const { resultsBaseApiUrl } = this.configAdapter;
    return axios.get(
      `${resultsBaseApiUrl}/test-results/upload?interface=${this.interface}&batch_size=${this.batchSize}`,
    );
  }
}
