import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { Address, LetterPersonalisation } from '../../domain/personalisation.model';
import { INotifyClient } from '../../domain/notify-client.interface';
import { AxiosError } from 'axios';
import { get } from 'lodash';
import * as Handlebars from 'handlebars';
import { templateMapper } from './template-selector';
import { TestOutcome } from '../../domain/test-outcome';
import { ConductedLanguage } from '../../domain/conducted-language';

export async function sendLetter(
  templateId: string,
  letterPersonalisation: LetterPersonalisation,
  reference: string,
  notifyClient: INotifyClient,
) {

  try {

    console.log('I NEED DETAILS');
    console.log('templateId', templateId);
    console.log('personalisation', letterPersonalisation);
    console.log('reference', reference);

    const address: Address = {
      address_line_1: letterPersonalisation.address_line_1,
      address_line_2: letterPersonalisation.address_line_2,
      ...(letterPersonalisation.address_line_3 ? {address_line_3: letterPersonalisation.address_line_3} : null),
      ...(letterPersonalisation.address_line_4 ? {address_line_4: letterPersonalisation.address_line_4} : null),
      ...(letterPersonalisation.address_line_5 ? {address_line_5: letterPersonalisation.address_line_5} : null),
      ...(letterPersonalisation.address_line_6 ? {address_line_6: letterPersonalisation.address_line_6} : null),
      postcode: letterPersonalisation.postcode,
    };

    let renderedText;

    try {
      const compileTemplate = Handlebars.compile(
        templateMapper(TestOutcome.PASS, letterPersonalisation.category, ConductedLanguage.ENGLISH)
      );
      renderedText = compileTemplate(letterPersonalisation);

    } catch (error) {
      console.error('Error preparing renderedText', error);
    }

    const personalisation = {
      ...address,
      renderedText,
    };

    console.log('personalisation', personalisation);

    await notifyClient.sendLetter(templateId, {personalisation, reference});
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
