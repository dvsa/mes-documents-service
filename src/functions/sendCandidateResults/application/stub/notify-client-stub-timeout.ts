
import { INotifyClient } from '../../domain/notify-client.interface';
import { injectable } from 'inversify';
import { IConfigAdapter } from '../../framework/adapter/config/config-adapter.interface';

@injectable()
export class NotifyClientStubTimeout implements INotifyClient {

  static halfSecond = 500;

  constructor(private configAdapter: IConfigAdapter) {
  }

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {

    return new Promise((resolve) => {
      setInterval(() => {
        resolve({
          id: 'bfb50d92-100d-4b8b-b559-14fa3b091cda',
          reference: null,
          content: {
            subject: 'Licence renewal',
            body: 'Dear Bill, your driving license test is here.',
            from_email: 'the_service@gov.uk',
          },
          uri: 'https://api.notifications.service.gov.uk/v2/notifications/ceb50d92-100d-4b8b-b559-14fa3b091cd',
          template: {
            id: 'ceb50d92-100d-4b8b-b559-14fa3b091cda',
            version: 1,
            // eslint-disable-next-line max-len
            uri: 'https://api.notificaitons.service.gov.uk/service/your_service_id/templates/bfb50d92-100d-4b8b-b559-14fa3b091cda',
          },
        });
      },          this.configAdapter.notifyTimeout + NotifyClientStubTimeout.halfSecond);
    });
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    return new Promise((resolve) => {
      setInterval(() => {
        resolve({
          id: 'bfb50d92-100d-4b8b-b559-14fa3b091cda',
          reference: null,
          content: {
            subject: 'Licence renewal',
            body: 'Dear Bill, your driving license test is here.',
            from_email: 'the_service@gov.uk',
          },
          uri: 'https://api.notifications.service.gov.uk/v2/notifications/ceb50d92-100d-4b8b-b559-14fa3b091cd',
          template: {
            id: 'ceb50d92-100d-4b8b-b559-14fa3b091cda',
            version: 1,
            // eslint-disable-next-line max-len
            uri: 'https://api.notificaitons.service.gov.uk/service/your_service_id/templates/bfb50d92-100d-4b8b-b559-14fa3b091cda',
          },
        });
      },          this.configAdapter.notifyTimeout + NotifyClientStubTimeout.halfSecond);
    });
  }

}
