import { IConfigAdapter } from '../config-adapter.interface';
import { injectable } from 'inversify';

@injectable()
export class ConfigAdapterMock implements IConfigAdapter {

  isLocal: boolean = true;
  useNotify: boolean = false;
  retryLimit: number = 3;
  apiKey: string = 'api-key';

  englishEmailPassTemplateId: string = 'email-pass-template-id';
  englishEmailFailTemplateId: string = 'email-fail-template-id';
  welshEmailPassTemplateId: string = 'email-welsh-pass-template-id';
  welshEmailFailTemplateId: string = 'email-welsh-fail-template-id';

  englishLetterPassTemplateId: string = 'post-pass-template-id';
  englishLetterFailTemplateId: string = 'post-fail-template-id';
  welshLetterPassTemplateId: string = 'post-welsh-pass-template-id';
  welshLetterFailTemplateId: string = 'post-welsh-fail-template-id';
}
