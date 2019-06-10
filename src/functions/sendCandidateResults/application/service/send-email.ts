import { NotifyClient } from 'notifications-node-client';
import { DocumentsServiceError } from '../../domain/errors/documents-service-error';

export async function sendEmail(
    emailAddress: string,
    templateId: string,
    personalisation: any,
    reference: string,
    emailReplyToId: string,
    client: NotifyClient,
)  : Promise <any> {

  try {
    await client.sendEmail(templateId, emailAddress, { personalisation, reference, emailReplyToId });
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
