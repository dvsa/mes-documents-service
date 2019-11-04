import { ActivityCode, ConductedLanguage } from '@dvsa/mes-test-schema/categories/common';
import { IConfigAdapter } from '../../framework/adapter/config/config-adapter.interface';
import { TYPES } from '../../framework/di/types';
import { inject, injectable } from 'inversify';

export interface ITemplateIdProvider {
  getEmailTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string;

  getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string;
}

@injectable()
export class TemplateIdProvider implements ITemplateIdProvider {
  static TEMPLATE_ID_NOT_SET = 'Template Id not set';
  constructor(@inject(TYPES.IConfigAdapter) private configAdapter: IConfigAdapter) {
  }

  getEmailTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string {
    if (language === 'Cymraeg') {
      if (isPass(activityCode)) {
        return this.configAdapter.welshEmailPassTemplateId;
      }
      if (isFail(activityCode)) {
        return this.configAdapter.welshEmailFailTemplateId;
      }
      return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
    }
    if (isPass(activityCode)) {
      return this.configAdapter.englishEmailPassTemplateId;
    }
    if (isFail(activityCode)) {
      return this.configAdapter.englishEmailFailTemplateId;
    }
    return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
  }

  getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string {
    if (language === 'Cymraeg') {
      if (isPass(activityCode)) {
        return this.configAdapter.welshLetterPassTemplateId;
      }
      if (isFail(activityCode)) {
        return this.configAdapter.welshLetterFailTemplateId;
      }
      return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
    }

    if (isPass(activityCode)) {
      return this.configAdapter.englishLetterPassTemplateId;
    }
    if (isFail(activityCode)) {
      return this.configAdapter.englishLetterFailTemplateId;
    }
    return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
  }
}

export function isPass(activityCode: ActivityCode): boolean {
  return activityCode === '1';
}

export function isFail(activityCode: ActivityCode): boolean {
  return activityCode === '2' || activityCode === '3' || activityCode === '4' || activityCode === '5';
}
