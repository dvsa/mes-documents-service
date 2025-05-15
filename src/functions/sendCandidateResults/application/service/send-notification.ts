/* eslint-disable max-len */
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
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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
  padi: boolean = false,
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
  padi: boolean = false,
): string | undefined {
  try {
    if (padi) return notificationPersonalisation.category === TestCategory.SC ? 'ADI SC – 3rd Attempt Fail' : 'ADI Part 3 - 3rd Attempt Fail';
    const compileSubject = Handlebars.compile(
      subjectMapper(notificationPersonalisation.category, conductedLanguage)
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
 */
export function getRenderedText(
  testOutcome: TestOutcome,
  notificationPersonalisation: PersonalisationDetails,
  conductedLanguage: Language,
  padi: boolean = false,
): string | undefined {
  try {
    const compileTemplate = Handlebars.compile(
      // eslint-disable-next-line max-len
      templateMapper(testOutcome, notificationPersonalisation.category, conductedLanguage, padi, notificationPersonalisation.previousAttempts)
    );
    return compileTemplate(notificationPersonalisation);
  } catch (error) {
    throw Error(`Error preparing renderedText ${error}`);
  }
}
