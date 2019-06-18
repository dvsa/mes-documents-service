import { injectable } from 'inversify';
import { INotifyClient } from '../domain/notify-client.interface';

@injectable()
export class LogNotifyClient implements INotifyClient {
  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    console.log(`email would be sent to ${emailAddress},
      first name: ${options.personalisation.firstName}, on date: ${options.personalisation.date}`);
    return Promise.resolve({});
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    console.log(`letter would be sent for ${options.personalisation.firstName},
      to postcode: ${options.personalisation.postcode}, on date: ${options.personalisation.date}`);
    return Promise.resolve({});
  }

}
