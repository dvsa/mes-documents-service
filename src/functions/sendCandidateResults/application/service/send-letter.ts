import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { LetterPersonalisation } from '../../domain/personalisation.model';
import { INotifyClient } from '../../domain/notify-client.interface';
import { AxiosError } from 'axios';
import { get } from 'lodash';

export async function sendLetter(
  templateId: string,
  personalisation: LetterPersonalisation,
  reference: string,
  notifyClient: INotifyClient,
) {

  try {
    await notifyClient.sendLetter(templateId, { personalisation, reference });
    return Promise.resolve();
  } catch (err: any) {
    const axiosError = err as unknown as AxiosError;
    const statusCode = get(axiosError, 'response.status', 0);
    const message = get(axiosError, 'response.data.errors[0].message', '');

    if (statusCode === 400 || statusCode === 403 || statusCode === 429) {
      return Promise.reject(new DocumentsServiceError(statusCode, message, false));
    }

    return Promise.reject(new DocumentsServiceError(statusCode, message, true));
  }
}
