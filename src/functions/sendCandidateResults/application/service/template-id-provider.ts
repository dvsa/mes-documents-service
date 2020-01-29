import {
  ActivityCode,
  CategoryCode, CommunicationMethod,
  CommunicationPreferences,
  ConductedLanguage,
} from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { IConfigAdapter } from '../../framework/adapter/config/config-adapter.interface';
import { TYPES } from '../../framework/di/types';
import { inject, injectable } from 'inversify';
import { get } from 'lodash';

export interface ITemplateIdProvider {
  getTemplateId(
    communicationPreferences: CommunicationPreferences, activityCode: ActivityCode, category: CategoryCode): string;
}

type CorrespondenceMethod = 'Email' | 'Letter';
enum Language {
  ENGLISH = 'english',
  WELSH = 'welsh',
  CYMRAEG = 'Cymraeg',
}
enum TestType {
  VOCATIONAL = 'Vocational',
}

@injectable()
export class TemplateIdProvider implements ITemplateIdProvider {
  static TEMPLATE_ID_NOT_SET = 'Template Id not set';

  constructor(@inject(TYPES.IConfigAdapter) public configAdapter: IConfigAdapter) {
  }

  getTemplateId(
    communicationPreferences: CommunicationPreferences, activityCode: ActivityCode, category: CategoryCode): string {

    const { conductedLanguage, communicationMethod } = communicationPreferences;
    const baseTemplate: string = getTemplateString(conductedLanguage, communicationMethod, activityCode);

    if (baseTemplate === TemplateIdProvider.TEMPLATE_ID_NOT_SET) {
      return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
    }
    if (isVocationalCategory(category)) {
      return get(this.configAdapter, `${baseTemplate}${TestType.VOCATIONAL}`);
    }
    return get(this.configAdapter, baseTemplate);
  }
}

export function isPass(activityCode: ActivityCode): boolean {
  return activityCode === '1';
}

export function isFail(activityCode: ActivityCode): boolean {
  return activityCode === '2' || activityCode === '3' || activityCode === '4' || activityCode === '5';
}

export function isVocationalCategory(category: CategoryCode): boolean {
  return [
    TestCategory.C,
    TestCategory.CE,
    TestCategory.C1,
    TestCategory.C1E,
  ].includes(category as TestCategory);
}

export function getTemplateString(
  conductedLanguage: ConductedLanguage, communicationMethod: CommunicationMethod, activityCode: ActivityCode): string {

  const languageOfTemplate: Language = (conductedLanguage === Language.CYMRAEG) ? Language.WELSH : Language.ENGLISH;
  const correspondenceMethod: CorrespondenceMethod = (communicationMethod === 'Post') ? 'Letter' : 'Email';

  if (isPass(activityCode)) {
    return `${languageOfTemplate}${correspondenceMethod}PassTemplateId`;
  }
  if (isFail(activityCode)) {
    return `${languageOfTemplate}${correspondenceMethod}FailTemplateId`;
  }
  return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
}
