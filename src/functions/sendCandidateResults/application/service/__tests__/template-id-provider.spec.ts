import {
  getTemplateString,
  TemplateIdProvider,
} from '../template-id-provider';
import { ConfigAdapterMock } from '../../../framework/adapter/config/__mocks__/config-adapter.mock';
import {
  CommunicationPreferences,
} from '@dvsa/mes-test-schema/categories/common';
import { Correspondence } from '../../../domain/template-id.model';

const communicationPreferences: CommunicationPreferences = {
  updatedEmail: 'email@somewhere.com',
  communicationMethod: 'Not provided',
  conductedLanguage: 'Not provided',
};

describe('TemplateIdProvider', () => {
  let templateIdProvider: TemplateIdProvider;

  beforeEach(() => {
    templateIdProvider = new TemplateIdProvider(new ConfigAdapterMock);
  });

  describe('getTemplateId', () => {

    it('should return the email template for communication set to email', () => {
      expect(templateIdProvider.getTemplateId(Correspondence.EMAIL))
        .toEqual('email-template-id');
    });

    it('should return the letter template for communication set to post', () => {
      expect(templateIdProvider.getTemplateId(Correspondence.POST))
        .toEqual('letter-template-id');
    });

    it('should return the template id not set when communication set to not provided', () => {
      expect(templateIdProvider.getTemplateId('Not provided'))
        .toEqual('Template Id not set');
    });

    it('should return the template id not set when communication set to Support Centre', () => {
      expect(templateIdProvider.getTemplateId('Support Centre'))
        .toEqual('Template Id not set');
    });
  });

  describe('getTemplateString', () => {
    it('should return emailTemplateId for Correspondence.EMAIL', () => {
      const result = getTemplateString(Correspondence.EMAIL);
      expect(result).toEqual('emailTemplateId');
    });

    it('should return letterTemplateId for Correspondence.POST', () => {
      const result = getTemplateString(Correspondence.POST);
      expect(result).toEqual('letterTemplateId');
    });

    it('should return TemplateIdProvider.TEMPLATE_ID_NOT_SET for not provided', () => {
      const result = getTemplateString('Not provided');
      expect(result).toEqual('Template Id not set');
    });

    it('should return TemplateIdProvider.TEMPLATE_ID_NOT_SET for Support Centre', () => {
      const result = getTemplateString('Support Centre');
      expect(result).toEqual('Template Id not set');
    });
  });

});
