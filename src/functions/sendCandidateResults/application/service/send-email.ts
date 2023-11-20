import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { EmailPersonalisation } from '../../domain/personalisation.model';
import { INotifyClient } from '../../domain/notify-client.interface';
import { get } from 'lodash';
import { AxiosError } from 'axios';
import * as Handlebars from 'handlebars';
import { templateMapper } from './template-selector';
import { ConductedLanguage } from '../../domain/conducted-language';
import { TestOutcome } from '../../domain/test-outcome';
import { emailDrivingTestSubject } from '../templates/common/email-subject';

export async function sendEmail(
  emailAddress: string,
  templateId: string,
  emailPersonalisation: EmailPersonalisation,
  reference: string,
  emailReplyToId: string,
  client: INotifyClient,
): Promise<any> {

  try {
    console.log('I NEED DETAILS');
    console.log('templateId', templateId);
    console.log('emailAddress', emailAddress);
    console.log('personalisation', emailPersonalisation);
    console.log('reference', reference);
    console.log('emailReplyToId', emailReplyToId);

    let renderedSubject;
    let renderedText;

    try {
      const compileSubject = Handlebars.compile(`
        ${emailDrivingTestSubject}
    `);
      renderedSubject = compileSubject(emailPersonalisation);
      console.log('renderedSubject', renderedSubject);
    } catch (error) {
      console.error('Error preparing renderedSubject', error);
    }

    try {
      const compileTemplate = Handlebars.compile(
        templateMapper(TestOutcome.FAIL, emailPersonalisation.category, ConductedLanguage.ENGLISH)
      );
      renderedText = compileTemplate(emailPersonalisation);

      console.log('renderedText', renderedText);
    } catch (error) {
      console.error('Error preparing renderedText', error);
    }

    const personalisation = {
      renderedSubject,
      renderedText,
    };

    await client.sendEmail(templateId, emailAddress, {personalisation, reference, emailReplyToId});
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
