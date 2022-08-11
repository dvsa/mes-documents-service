
import { INotifyClient } from '../../domain/notify-client.interface';
import { injectable } from 'inversify';
import { AxiosError } from 'axios';

@injectable()
export class NotifyClientStubFailure400 implements INotifyClient {

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<AxiosError> {
    console.log('Fail Sending Email');

    console.log('templateId', templateId);
    console.log('emailAddress', emailAddress);
    console.log('emailAttributes', options);

    return Promise.reject({
      response: {
        status: 400,
        data: {
          errors: [
            {
              error: 'BadRequestError',
              message: 'Can\'t send to this recipient using a team-only API key',
            },
          ],
        },
      },
    } as AxiosError);
  }

  sendLetter(templateId: string, options: any): Promise<AxiosError> {
    console.log('Fail Sending Letter');

    console.log('templateId', templateId);
    console.log('letterAttributes', options);

    return Promise.reject({
      response: {
        status: 400,
        data: {
          errors: [
            {
              error: 'BadRequestError',
              message: 'Can\'t send to this recipient using a team-only API key',
            },
          ],
        },
      },
    } as AxiosError);
  }

}
