import {ITemplateAdapter} from '../template-adapter';
import {injectable} from 'inversify';

@injectable()
export class TemplateAdapterMock implements ITemplateAdapter {
  private templateIDsJson: any = 'some value';

  async getTemplateIDsJson(): Promise<any> {
    return Promise.resolve(this.templateIDsJson);
  }
}
