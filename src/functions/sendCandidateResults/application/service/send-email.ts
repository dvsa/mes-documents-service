import { NotifyClient } from 'notifications-node-client';

export async function sendEmail(
    emailAddress: string,
    templateId: string,
    emailOptions: any,
    client: NotifyClient,
)  : Promise <any> {

  try {
    await client.sendEmail(templateId, emailAddress, emailOptions);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
