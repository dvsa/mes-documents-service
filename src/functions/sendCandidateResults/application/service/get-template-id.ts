import { ActivityCode, ConductedLanguage } from '@dvsa/mes-test-schema/categories/B';
import { DocumentsServiceError } from '../../domain/errors/documents-service-error';

export function getEmailTemplateId(language : ConductedLanguage, activityCode: ActivityCode): string {
  if (language === 'Cymraeg') {
    if (isPass(activityCode)) {
      return process.env.NOTIFY_EMAIL_WELSH_PASS_TEMPLATE_ID || '';
    }
    if (isFail(activityCode)) {
      return process.env.NOTIFY_EMAIL_WELSH_FAIL_TEMPLATE_ID || '';
    }
    throwError(activityCode);
  }
  if (isPass(activityCode)) {
    return process.env.NOTIFY_EMAIL_PASS_TEMPLATE_ID || '';
  }
  if (isFail(activityCode)) {
    return process.env.NOTIFY_EMAIL_FAIL_TEMPLATE_ID || '';
  }
  throwError(activityCode);
  return '';
}

export function getLetterTemplateId(language: ConductedLanguage, activityCode: ActivityCode): string {
  if (language === 'Cymraeg') {
    if (isPass(activityCode)) {
      return process.env.NOTIFY_POST_WELSH_PASS_TEMPLATE_ID || '';
    }
    if (isFail(activityCode)) {
      return process.env.NOTIFY_POST_WELSH_FAIL_TEMPLATE_ID || '';
    }
    throwError(activityCode);
  }
  if (isPass(activityCode)) {
    return process.env.NOTIFY_POST_PASS_TEMPLATE_ID || '';
  }
  if (isFail(activityCode)) {
    return process.env.NOTIFY_POST_FAIL_TEMPLATE_ID || '';
  }
  throwError(activityCode);
  return '';
}

function isPass(activityCode: ActivityCode): boolean {
  return activityCode === '1';
}

function isFail(activityCode: ActivityCode) : boolean {
  return activityCode === '2' || activityCode === '3';
}

function throwError(activityCode: ActivityCode) : void {
  throw new DocumentsServiceError(
     0 ,
     `Failed to get template id for activity code { activityCode }`,
     false);
}
