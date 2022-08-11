
import { INotifyClient } from '../../domain/notify-client.interface';
import { injectable } from 'inversify';
import { AxiosError } from 'axios';

@injectable()
export class NotifyClientStubFailure500 implements INotifyClient {

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<AxiosError> {
    return Promise.reject({
      response: {
        status: 500,
        data: {
          errors: [
            {
              error: 'Exception',
              message: 'Internal server error',
            },
          ],
        },
      },
    } as AxiosError);
  }

  sendLetter(templateId: string, options: any): Promise<AxiosError> {
    return Promise.reject({
      response: {
        status: 500,
        data: {
          errors: [
            {
              error: 'Exception',
              message: 'Internal server error',
            },
          ],
        },
      },
    } as AxiosError);
  }

}
