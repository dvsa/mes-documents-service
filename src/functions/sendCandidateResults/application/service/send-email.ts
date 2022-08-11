import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { EmailPersonalisation } from '../../domain/personalisation.model';
import { INotifyClient } from '../../domain/notify-client.interface';
import { get } from 'lodash';
import { AxiosError } from 'axios';

export async function sendEmail(
  emailAddress: string,
  templateId: string,
  personalisation: EmailPersonalisation,
  reference: string,
  emailReplyToId: string,
  client: INotifyClient,
): Promise<any> {

  try {
    await client.sendEmail(templateId, emailAddress, { personalisation, reference, emailReplyToId });
    return Promise.resolve();
  } catch (err: any) {
    const axiosError = err as unknown as AxiosError;
    const statusCode = get(axiosError, 'response.status');
    const message = get(axiosError, 'response.data.errors[0].message');

    if (statusCode === 400 || statusCode === 403 || statusCode === 429) {
      return Promise.reject(new DocumentsServiceError(statusCode, message, false));
    }

    return Promise.reject(new DocumentsServiceError(statusCode, message, true));
  }
}
