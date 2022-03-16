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

  englishLetterPassTemplateIdAMod1: string = 'post-english-pass-template-id-amod1';
  englishLetterFailTemplateIdAMod1: string = 'post-english-fail-template-id-amod1';
  welshLetterPassTemplateIdAMod1: string = 'post-welsh-pass-template-id-amod1';
  welshLetterFailTemplateIdAMod1: string = 'post-welsh-fail-template-id-amod1';

  englishEmailPassTemplateIdAMod2: string = 'email-english-pass-template-id-amod2';
  englishEmailFailTemplateIdAMod2: string = 'email-english-fail-template-id-amod2';
  welshEmailPassTemplateIdAMod2: string = 'email-welsh-pass-template-id-amod2';
  welshEmailFailTemplateIdAMod2: string = 'email-welsh-fail-template-id-amod2';

  englishLetterPassTemplateIdAMod2: string = 'post-english-pass-template-id-amod2';
  englishLetterFailTemplateIdAMod2: string = 'post-english-pass-template-id-amod2';
  welshLetterPassTemplateIdAMod2: string = 'post-welsh-pass-template-id-amod2';
  welshLetterFailTemplateIdAMod2: string = 'post-welsh-pass-template-id-amod2';

  englishEmailPassTemplateIdHome: string = 'email-english-pass-template-id-home';
  englishEmailFailTemplateIdHome: string = 'email-english-fail-template-id-home';
  welshEmailPassTemplateIdHome: string = 'email-welsh-pass-template-id-home';
  welshEmailFailTemplateIdHome: string = 'email-welsh-fail-template-id-home';

  englishLetterPassTemplateIdHome: string = 'post-english-pass-template-id-home';
  englishLetterFailTemplateIdHome: string = 'post-english-fail-template-id-home';
  welshLetterPassTemplateIdHome: string = 'post-welsh-pass-template-id-home';
  welshLetterFailTemplateIdHome: string = 'post-welsh-fail-template-id-home';

  englishEmailPassTemplateIdAdi2: string = 'email-english-pass-template-id-adi2';
  englishEmailFailTemplateIdAdi2: string = 'email-english-fail-template-id-adi2';
  welshEmailPassTemplateIdAdi2: string = 'email-welsh-pass-template-id-adi2';
  welshEmailFailTemplateIdAdi2: string = 'email-welsh-fail-template-id-adi2';

  englishLetterPassTemplateIdAdi2: string = 'post-english-pass-template-id-adi2';
  englishLetterFailTemplateIdAdi2: string = 'post-english-fail-template-id-adi2';
  welshLetterPassTemplateIdAdi2: string = 'post-welsh-pass-template-id-adi2';
  welshLetterFailTemplateIdAdi2: string = 'post-welsh-fail-template-id-adi2';

  englishEmailPassTemplateIdCpc: string = 'email-english-pass-template-id-cpc';
  englishEmailFailTemplateIdCpc: string = 'email-english-fail-template-id-cpc';
  welshEmailPassTemplateIdCpc: string = 'email-welsh-pass-template-id-cpc';
  welshEmailFailTemplateIdCpc: string = 'email-welsh-fail-template-id-cpc';

  englishLetterPassTemplateIdCpc: string = 'post-english-pass-template-id-cpc';
  englishLetterFailTemplateIdCpc: string = 'post-english-fail-template-id-cpc';
  welshLetterPassTemplateIdCpc: string = 'post-welsh-pass-template-id-cpc';
  welshLetterFailTemplateIdCpc: string = 'post-welsh-fail-template-id-cpc';

  englishEmailPassTemplateIdMan: string = 'email-english-pass-template-id-man';
  englishEmailFailTemplateIdMan: string = 'email-english-fail-template-id-man';
  welshEmailPassTemplateIdMan: string = 'email-welsh-pass-template-id-man';
  welshEmailFailTemplateIdMan: string = 'email-welsh-fail-template-id-man';

  englishLetterPassTemplateIdMan: string = 'post-english-pass-template-id-man';
  englishLetterFailTemplateIdMan: string = 'post-english-fail-template-id-man';
  welshLetterPassTemplateIdMan: string = 'post-welsh-pass-template-id-man';
  welshLetterFailTemplateIdMan: string = 'post-welsh-fail-template-id-man';

  async getApiKey(): Promise<string> {
    return Promise.resolve(this.apiKey);
  }
}
