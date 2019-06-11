import { INotifyClient } from '../domain/notify-client.interface';

export class LogNotifyClient implements INotifyClient {
  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    console.log('log this to CloudWatch');
    return Promise.resolve();
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    console.log('log this to CloudWatch');
    return Promise.resolve();
  }

}
