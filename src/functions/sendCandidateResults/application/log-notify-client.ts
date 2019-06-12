import { injectable } from 'inversify';
import { INotifyClient } from '../domain/notify-client.interface';

@injectable()
export class LogNotifyClient implements INotifyClient {
  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    console.log('log this to CloudWatch');
    return Promise.resolve({});
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    console.log('log this to CloudWatch');
    return Promise.resolve({});
  }

}
