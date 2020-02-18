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

  englishEmailPassTemplateId: string = 'email-english-pass-template-id';
  englishEmailFailTemplateId: string = 'email-english-fail-template-id';
  welshEmailPassTemplateId: string = 'email-welsh-pass-template-id';
  welshEmailFailTemplateId: string = 'email-welsh-fail-template-id';

  englishLetterPassTemplateId: string = 'post-english-pass-template-id';
  englishLetterFailTemplateId: string = 'post-english-fail-template-id';
  welshLetterPassTemplateId: string = 'post-welsh-pass-template-id';
  welshLetterFailTemplateId: string = 'post-welsh-fail-template-id';

  englishEmailPassTemplateIdVocational: string = 'email-english-pass-template-id-vocational';
  englishEmailFailTemplateIdVocational: string = 'email-english-fail-template-id-vocational';
  welshEmailPassTemplateIdVocational: string = 'email-welsh-pass-template-id-vocational';
  welshEmailFailTemplateIdVocational: string = 'email-welsh-fail-template-id-vocational';

  englishLetterPassTemplateIdVocational: string = 'post-english-pass-template-id-vocational';
  englishLetterFailTemplateIdVocational: string = 'post-english-fail-template-id-vocational';
  welshLetterPassTemplateIdVocational: string = 'post-welsh-pass-template-id-vocational';
  welshLetterFailTemplateIdVocational: string = 'post-welsh-fail-template-id-vocational';

  englishEmailPassTemplateIdAMod1: string = 'email-english-pass-template-id-amod1';
  englishEmailFailTemplateIdAMod1: string = 'email-english-fail-template-id-amod1';
  welshEmailPassTemplateIdAMod1: string = 'email-welsh-pass-template-id-amod1';
  welshEmailFailTemplateIdAMod1: string = 'email-welsh-fail-template-id-amod1';

  async getApiKey(): Promise<string> {
    return Promise.resolve(this.apiKey);
  }
}
