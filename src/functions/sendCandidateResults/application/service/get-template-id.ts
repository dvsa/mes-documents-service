import { ActivityCode, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';
import { DocumentsServiceError } from '../../domain/errors/documents-service-error';
import { Config } from '../../framework/adapter/config/config-provider';

export function getEmailTemplateId(language : ConductedLanguage, activityCode: ActivityCode): string {
  const config: Config = new Config();

  if (language === 'Cymraeg') {
    if (isPass(activityCode)) {
      return config.welshEmailPassTemplateId;
    }
    if (isFail(activityCode)) {
      return config.welshEmailFailTemplateId;
    }
    isTerminated(activityCode);
  }
  if (isPass(activityCode)) {
    return config.englishEmailPassTemplateId;
  }
  if (isFail(activityCode)) {
    return config.englishEmailFailTemplateId;
  }
  isTerminated(activityCode);
  return '';
}

export function getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string {
  const config: Config = new Config();

  if (language === 'Cymraeg') {
    if (isPass(activityCode)) {
      return config.welshLetterPassTemplateId;
    }
    if (isFail(activityCode)) {
      return config.welshLetterFailTemplateId;
    }
    isTerminated(activityCode);
  }
  if (isPass(activityCode)) {
    return config.englishLetterPassTemplateId;
  }
  if (isFail(activityCode)) {
    return config.englishLetterFailTemplateId;
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
