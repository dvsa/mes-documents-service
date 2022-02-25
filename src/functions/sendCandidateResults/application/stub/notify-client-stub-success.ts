import { INotifyClient } from '../../domain/notify-client.interface';
import { injectable } from 'inversify';

@injectable()
export class NotifyClientStubSuccess implements INotifyClient {

  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any> {
    return new Promise((resolve) => {
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
    });
  }

  sendLetter(templateId: string, options: any): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        id: '740e5834-3a29-46b4-9a6f-16142fde533a',
        reference: null,
        content: {
          subject: 'Licence renewal',
          body: 'Dear Bill, your driving license test is here.',
        },
        uri: 'https://api.notifications.service.gov.uk/v2/notifications/740e5834-3a29-46b4-9a6f-16142fde533a',
        template: {
          id: 'f33517ff-2a88-4f6e-b855-c550268ce08a',
          version: 1,
          uri: 'https://api.notifications.service.gov.uk/v2/template/f33517ff-2a88-4f6e-b855-c550268ce08a',
        },
        scheduled_for: null,
      });
    });
  }

}
