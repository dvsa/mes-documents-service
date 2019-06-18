import { injectable } from 'inversify';
import { INotifyClient } from '../domain/notify-client.interface';

@injectable()
export class LogNotifyClient implements INotifyClient {
  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    console.log(`email would be sent to ${emailAddress}, personalisation: ${JSON.stringify(options.personalisation)}`);
    return Promise.resolve({});
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    console.log(`letter would be sent, personalisation: ${JSON.stringify(options.personalisation)}`);
    return Promise.resolve({});
  }

}
