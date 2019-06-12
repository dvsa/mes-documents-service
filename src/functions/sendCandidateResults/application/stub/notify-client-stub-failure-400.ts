
import { INotifyClient } from '../../domain/notify-client.interface';
import { injectable } from 'inversify';

@injectable()
export class NotifyClientStubFailure400 implements INotifyClient {

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    console.log('Fail Sending Email');

    console.log('templateId', templateId);
    console.log('emailAddress', emailAddress);
    console.log('emailAttributes', options);

    return Promise.reject({
      error: {
        status_code: 400,
        errors: {
          error: 'BadRequestError',
          // tslint:disable-next-line
          message: 'Can not send to this recipient when service is in trial mode - see www.notifications.service.gov.uk/trial-mode',
        },
      },
    });
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    console.log('Fail Sending Letter');

    console.log('templateId', templateId);
    console.log('letterAttributes', options);

    return Promise.reject({
      error: {
        status_code: 400,
        errors: {
          error: 'BadRequestError',
          // tslint:disable-next-line
          message: 'Cannot send letters when service is in trial mode - see https://www.notifications.service.gov.uk/trial-mode',
        },
      },
    });
  }

}
