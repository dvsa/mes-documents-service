import { IConfigAdapter } from '../config-adapter.interface';
import { injectable } from 'inversify';

@injectable()
export class ConfigAdapterMock implements IConfigAdapter {

  private apiKey: string = 'api-key';

  isLocal: boolean = true;
  useNotify: boolean = false;
  retryLimit: number = 3;
  resultsBaseApiUrl: string = 'results-base-api-url';
  notifyBatchSize: number = 250;
  notifyRequestsPerBatch: number = 25;
  notifyTimeout: number = 1000;

  emailTemplateId: string = 'email-template-id';
  letterTemplateId: string = 'letter-template-id';

  async getApiKey(): Promise<string> {
    return Promise.resolve(this.apiKey);
  }
}
