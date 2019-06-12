import { ActivityCode, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';
import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { IConfigAdapter } from '../../framework/adapter/config/config-adapter.interface';
import { container } from '../../framework/di/inversify.config';
import { TYPES } from '../../framework/di/types';

export function getEmailTemplateId(language : ConductedLanguage, activityCode: ActivityCode): string {
  const configAdapter: IConfigAdapter = container.get<IConfigAdapter>(TYPES.IConfigAdapter);

  if (language === 'Cymraeg') {
    if (isPass(activityCode)) {
      return configAdapter.welshEmailPassTemplateId;
    }
    if (isFail(activityCode)) {
      return configAdapter.welshEmailFailTemplateId;
    }
    isTerminated(activityCode);
  }
  if (isPass(activityCode)) {
    return configAdapter.englishEmailPassTemplateId;
  }
  if (isFail(activityCode)) {
    return configAdapter.englishEmailFailTemplateId;
  }
  isTerminated(activityCode);
  return '';
}

export function getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string {
  const configAdapter: IConfigAdapter = container.get<IConfigAdapter>(TYPES.IConfigAdapter);

  if (language === 'Cymraeg') {
    if (isPass(activityCode)) {
      return configAdapter.welshLetterPassTemplateId;
    }
    if (isFail(activityCode)) {
      return configAdapter.welshLetterFailTemplateId;
    }
    isTerminated(activityCode);
  }
  if (isPass(activityCode)) {
    return configAdapter.englishLetterPassTemplateId;
  }
  if (isFail(activityCode)) {
    return configAdapter.englishLetterFailTemplateId;
  }
  isTerminated(activityCode);
  return '';
}

function isPass(activityCode: ActivityCode): boolean {
  return activityCode === '1';
}

function isFail(activityCode: ActivityCode) : boolean {
  return activityCode === '2' || activityCode === '3';
}

function isTerminated(activityCode: ActivityCode) : void {
  throw new DocumentsServiceError(
     0 ,
     `Failed to get template id for activity code { activityCode }`,
     false);
}
