import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { Address, PersonalisationDetails } from '../../domain/personalisation.model';
import { INotifyClient } from '../../domain/notify-client.interface';
import { get, isNil, omitBy } from 'lodash';
import { AxiosError } from 'axios';
import * as Handlebars from 'handlebars';
import { subjectMapper, templateMapper } from './template-selector';
import { Language } from '../../domain/conducted-language';
import { TestOutcome } from '../../domain/test-outcome';
import { CommunicationMethod } from '@dvsa/mes-test-schema/categories/common';
import { Correspondence } from '../../domain/template-id.model';

export interface Personalisation extends Partial<Address>{
  renderedSubject: string | undefined;
  renderedText: string | undefined;
}

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

  let personalisation: Personalisation;
  let renderedSubject: string | undefined;
  let renderedText: string | undefined;
  let address: Address;

  try {
    renderedSubject = getRenderedSubject(notificationPersonalisation, conductedLanguage, padi);
  } catch (subjectError) {
    console.error('Error preparing rendered subject', subjectError);
    throw new Error('Error preparing rendered content');
  }

  try {
    renderedText = getRenderedText(testOutcome, notificationPersonalisation, conductedLanguage, padi);
  } catch (textError) {
    console.error('Error preparing rendered text', textError);
    throw new Error('Error preparing rendered content');
  }

  personalisation = {
    renderedSubject,
    renderedText,
  };

  // add address if POST
  if (communicationMethod === Correspondence.POST) {
    address = omitBy({
      address_line_1: notificationPersonalisation.address_line_1,
      address_line_2: notificationPersonalisation.address_line_2,
      address_line_3: notificationPersonalisation.address_line_3,
      address_line_4: notificationPersonalisation.address_line_4,
      address_line_5: notificationPersonalisation.address_line_5,
      address_line_6: notificationPersonalisation.address_line_6,
      postcode: notificationPersonalisation.postcode,
    }, isNil);

    personalisation = {
      ...personalisation,
      ...address,
    };
  }


  try {
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

/**
 * Compile subject from the appropriate category and personalisation
 * @param notificationPersonalisation
 * @param conductedLanguage
 * @param padi
 */
export function getRenderedSubject(
  notificationPersonalisation: PersonalisationDetails,
  conductedLanguage: Language,
  padi: boolean | undefined
): string | undefined {
  try {
    const compileSubject = Handlebars.compile(
      subjectMapper(notificationPersonalisation.category, conductedLanguage, padi)
    );
    return compileSubject(notificationPersonalisation);

  } catch (error) {
    throw Error(`Error preparing renderedSubject ${error}`);
  }
}

/**
 * Compile content from the appropriate category and personalisation
 * @param testOutcome
 * @param notificationPersonalisation
 * @param conductedLanguage
 * @param padi
 */
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
    throw Error(`Error preparing renderedText ${error}`);
  }
}
