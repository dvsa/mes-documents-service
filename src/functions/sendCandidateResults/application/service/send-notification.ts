import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { PersonalisationDetails } from '../../domain/personalisation.model';
import { INotifyClient } from '../../domain/notify-client.interface';
import { get } from 'lodash';
import { AxiosError } from 'axios';
import * as Handlebars from 'handlebars';
import { subjectMapper, templateMapper } from './template-selector';
import { Language } from '../../domain/conducted-language';
import { TestOutcome } from '../../domain/test-outcome';
import { CommunicationMethod } from '@dvsa/mes-test-schema/categories/common';
import { Correspondence } from '../../domain/template-id.model';

export async function sendNotification(
  emailAddress: string,
  communicationMethod: CommunicationMethod,
  templateId: string,
  notificationPersonalisation: PersonalisationDetails,
  reference: string,
  emailReplyToId: string,
  client: INotifyClient,
  conductedLanguage: Language,
  testOutcome: TestOutcome,
  padi?: boolean,
): Promise<any> {

  try {
    let address;
    let renderedSubject;

    let personalisation = {};

    try {
      const compileSubject = Handlebars.compile(
        subjectMapper(notificationPersonalisation.category, conductedLanguage, padi)
      );

      renderedSubject = compileSubject(notificationPersonalisation);

      personalisation = {
        ...personalisation,
        renderedSubject,
      };
    } catch (error) {
      console.error('Error preparing renderedSubject', error);
      return;
    }

    // add address if POST
    if (communicationMethod === Correspondence.POST) {
      address = {
        address_line_1: notificationPersonalisation.address_line_1,
        address_line_2: notificationPersonalisation.address_line_2,
        ...(notificationPersonalisation.address_line_3 ?
          {address_line_3: notificationPersonalisation.address_line_3} : null),
        ...(notificationPersonalisation.address_line_4 ?
          {address_line_4: notificationPersonalisation.address_line_4} : null),
        ...(notificationPersonalisation.address_line_5 ?
          {address_line_5: notificationPersonalisation.address_line_5} : null),
        ...(notificationPersonalisation.address_line_6 ?
          {address_line_6: notificationPersonalisation.address_line_6} : null),
        postcode: notificationPersonalisation.postcode,
      };

      personalisation = {
        ...personalisation,
        ...address,
      };
    }

    const renderedText = getRenderedText(testOutcome, notificationPersonalisation, conductedLanguage, padi);

    personalisation = {
      ...personalisation,
      renderedText,
    };

    communicationMethod === Correspondence.EMAIL ?
      await client.sendEmail(templateId, emailAddress, {personalisation, reference, emailReplyToId}) :
      await client.sendLetter(templateId, {personalisation, reference});
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

export function getRenderedText(
  testOutcome: TestOutcome,
  notificationPersonalisation: PersonalisationDetails,
  conductedLanguage: Language,
  padi: boolean | undefined
): string | undefined {
  try {
    const compileTemplate = Handlebars.compile(
      templateMapper(testOutcome, notificationPersonalisation.category, conductedLanguage, padi)
    );
    return compileTemplate(notificationPersonalisation);

  } catch (error) {
    console.error('Error preparing renderedText', error);
  }
}
