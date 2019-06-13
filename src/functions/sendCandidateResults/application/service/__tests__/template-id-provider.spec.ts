import { TemplateIdProvider, isPass, isFail } from '../template-id-provider';
import { ConfigAdapterMock } from '../../../framework/adapter/config/__mocks__/config-adapter.mock';

describe('get-template-id-provider', () => {

  describe('TemplateIdProvider', () => {

    let templateIdProvider: TemplateIdProvider;
    beforeEach(() => {
      templateIdProvider = new TemplateIdProvider(new ConfigAdapterMock);
    });

    describe('getEmailTemplateId', () => {
      it('should return the english email pass template', () => {
        expect(templateIdProvider.getEmailTemplateId('English', '1')).toBe('email-pass-template-id');
      });
      it('should return the english email fail template', () => {
        expect(templateIdProvider.getEmailTemplateId('English', '2')).toBe('email-fail-template-id');
      });
      it('should return the welsh email pass template', () => {
        expect(templateIdProvider.getEmailTemplateId('Cymraeg', '1')).toBe('email-welsh-pass-template-id');
      });
      it('should return the welsh email fail template', () => {
        expect(templateIdProvider.getEmailTemplateId('Cymraeg', '2')).toBe('email-welsh-fail-template-id');
      });
    });

    describe('getLetterTemplateId', () => {
      it('should return the english post pass template', () => {
        expect(templateIdProvider.getLetterTemplateId('English', '1')).toBe('post-pass-template-id');
      });
      it('should return the english post fail template', () => {
        expect(templateIdProvider.getLetterTemplateId('English', '2')).toBe('post-fail-template-id');
      });
      it('should return the welsh post pass template', () => {
        expect(templateIdProvider.getLetterTemplateId('Cymraeg', '1')).toBe('post-welsh-pass-template-id');
      });
      it('should return the welsh post fail template', () => {
        expect(templateIdProvider.getLetterTemplateId('Cymraeg', '2')).toBe('post-welsh-fail-template-id');
      });
    });
  });

  describe('isPass', () => {
    it('should return true if activty code is 1', () => {
      expect(isPass('1')).toBeTruthy();
    });
    it('should return false if activity code is not 1', () => {
      expect(isPass('2')).toBeFalsy();
    });
  });

  describe('isFail', () => {
    it('should return true if activty code is 2 ,3 ,4 or 5 ', () => {
      expect(isFail('2')).toBeTruthy();
      expect(isFail('3')).toBeTruthy();
      expect(isFail('4')).toBeTruthy();
      expect(isFail('5')).toBeTruthy();
    });
    it('should return false if activity code is 1', () => {
      expect(isFail('1')).toBeFalsy();
    });
  });

});
