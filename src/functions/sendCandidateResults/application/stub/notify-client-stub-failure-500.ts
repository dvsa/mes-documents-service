
import { INotifyClient } from '../../domain/notify-client.interface';
import { injectable } from 'inversify';

@injectable()
export class NotifyClientStubFailure500 implements INotifyClient {

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    console.log('Fail Sending Email with internal error');

    console.log('templateId', templateId);
    console.log('emailAddress', emailAddress);
    console.log('emailAttributes', options);

    return Promise.reject({
      error: {
        status_code: 500,
        errors: {
          error: 'Exception',
          message: 'Internal server error',
        },
      },
    });
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    console.log('Fail Sending Letter with internal error');

    console.log('templateId', templateId);
    console.log('letterAttributes', options);

    return Promise.reject({
      error: {
        status_code: 500,
        errors: {
          error: 'Exception',
          message: 'Internal server error',
        },
      },
    });
  }

}
