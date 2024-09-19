/* eslint-disable max-len */
import {Correspondence} from '../../domain/template-id.model';
import * as Handlebars from 'handlebars';

/**
 * Handlebars helper to correctly display the URL depending on if it's an E-mail or Letter
 */
Handlebars.registerHelper('displayUrlDataPrivacy', function (communicationMethod: string, urlDescriptor: string, url: string) {
  if (communicationMethod === Correspondence.EMAIL) {
    return `^[${urlDescriptor}](${url}).`;
  } else return `^${urlDescriptor}: ${url}`;
});

export const dataPrivacyTemplate = `
Find out how we collect, use and store your personal information at https:www.gov.uk/dvsa/privacy. 
`;

export const dataPrivacyWelshTemplate = `
Darganfyddwch sut rydym yn casglu, defnyddio a storio eich gwybodaeth bersonol yn https://www.gov.uk/dvsa/privacy. 
`;
