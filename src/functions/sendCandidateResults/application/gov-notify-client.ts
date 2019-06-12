import { injectable, inject } from 'inversify';
import { INotifyClient } from '../domain/notify-client.interface';
import { NotifyClient } from 'notifications-node-client';
import { TYPES } from '../framework/di/types';

@injectable()
export class GovNotifyClient implements INotifyClient {

  private notifyClient: NotifyClient;

  constructor(@inject(TYPES.apiKey) apiKey: string) {
    this.notifyClient = new NotifyClient(apiKey);
  }

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    return this.notifyClient.sendEmail(templateId, emailAddress, options);
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    return this.notifyClient.sendLetter(templateId, options);
  }

}
