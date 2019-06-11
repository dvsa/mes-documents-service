import { NotifyClient } from 'notifications-node-client';
import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { LetterPersonalisation } from '../../domain/personalisation.model';
import { NotifyClientStubSuccess } from '../stub/notify-client-stub-success';

export async function sendLetter(
    templateId: string,
    personalisation: LetterPersonalisation,
    reference: string,
    notifyClient: NotifyClient | NotifyClientStubSuccess,
) {

  try {
    await notifyClient.sendLetter(templateId, { personalisation, reference });
    return Promise.resolve();
  } catch (err) {
    const statusCode = err.error.status_code;
    const message = err.error.errors[0].message;

    if (statusCode === 400 || statusCode === 403 || statusCode === 429) {
      return Promise.reject(new DocumentsServiceError(statusCode, message, false));
    }

    return Promise.reject(new DocumentsServiceError(statusCode, message, true));
  }
}
