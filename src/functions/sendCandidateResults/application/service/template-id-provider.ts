import { ActivityCode, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';
import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { IConfigAdapter } from '../../framework/adapter/config/config-adapter.interface';
import { TYPES } from '../../framework/di/types';
import { inject, injectable } from 'inversify';

export interface ITemplateIdProvider {
  getEmailTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string;

  getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string;
}

@injectable()
export class TemplateIdProvider implements ITemplateIdProvider {

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
      isTerminated(activityCode);
    }
    if (isPass(activityCode)) {
      return this.configAdapter.englishEmailPassTemplateId;
    }
    if (isFail(activityCode)) {
      return this.configAdapter.englishEmailFailTemplateId;
    }
    isTerminated(activityCode);
    return '';
  }

  getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string {
    if (language === 'Cymraeg') {
      if (isPass(activityCode)) {
        return this.configAdapter.welshLetterPassTemplateId;
      }
      if (isFail(activityCode)) {
        return this.configAdapter.welshLetterFailTemplateId;
      }
      isTerminated(activityCode);
    }
    if (isPass(activityCode)) {
      return this.configAdapter.englishLetterPassTemplateId;
    }
    if (isFail(activityCode)) {
      return this.configAdapter.englishLetterFailTemplateId;
    }
    isTerminated(activityCode);
    return '';
  }
}

export function isPass(activityCode: ActivityCode): boolean {
  return activityCode === '1';
}

export function isFail(activityCode: ActivityCode) : boolean {
  return activityCode === '2' || activityCode === '3' || activityCode === '4' || activityCode === '5';
}

export function isTerminated(activityCode: ActivityCode) : void {
  throw new DocumentsServiceError(
     0 ,
     `Failed to get template id for activity code ${ activityCode }`,
     false);
}
