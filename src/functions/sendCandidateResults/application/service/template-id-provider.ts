import {
  ActivityCode,
  CategoryCode, CommunicationMethod,
  CommunicationPreferences,
  ConductedLanguage,
} from '@dvsa/mes-test-schema/categories/common';
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {inject, injectable} from 'inversify';
import {get} from 'lodash';

import {IConfigAdapter} from '../../framework/adapter/config/config-adapter.interface';
import {
  Correspondence,
  CorrespondenceMethod,
  Language,
  TemplateLanguage,
  TestType,
} from '../../domain/template-id.model';
import {TYPES} from '../../framework/di/types';

export interface ITemplateIdProvider {
  getTemplateId(
    communicationPreferences: CommunicationPreferences,
    activityCode: ActivityCode,
    category: CategoryCode
  ): string;
}

@injectable()
export class TemplateIdProvider implements ITemplateIdProvider {
  static TEMPLATE_ID_NOT_SET = 'Template Id not set';

  constructor(
    @inject(TYPES.IConfigAdapter) public configAdapter: IConfigAdapter) {
  }

  getTemplateId(
    communicationPreferences: CommunicationPreferences,
    activityCode: ActivityCode,
    category: CategoryCode,
  ): string {

    const { conductedLanguage, communicationMethod } = communicationPreferences;

    const baseTemplate: string = getTemplateString(
      conductedLanguage,
      communicationMethod as CommunicationMethod,
      activityCode,
      category,
    );

    if (baseTemplate === TemplateIdProvider.TEMPLATE_ID_NOT_SET) {
      return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
    }

    if (isVocationalCategory(category)) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.VOCATIONAL}`);
    }

    if (isAmod1Category(category)) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.AMOD1}`);
    }

    if (isAmod2Category(category)) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.AMOD2}`);
    }

    if (isHomeTestCategory(category)) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.HOME}`);
    }

    if (category === TestCategory.ADI2) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.ADI2}`);
    }

    if (category === TestCategory.ADI3 || category === TestCategory.SC) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.ADI3}`);
    }

    if (isCPCCategory(category)) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.CPC}`);
    }

    if (isManoeuvreCategory(category)) {
      return get<IConfigAdapter, string>(this.configAdapter, `${baseTemplate}${TestType.MANOEUVRE}`);
    }

    return get<IConfigAdapter, string>(this.configAdapter, baseTemplate);
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
    TestCategory.D,
    TestCategory.DE,
    TestCategory.D1,
    TestCategory.D1E,
  ].includes(category as TestCategory);
}

export function isAmod1Category(category: CategoryCode): boolean {
  return [
    TestCategory.EUAM1,
    TestCategory.EUA1M1,
    TestCategory.EUA2M1,
    TestCategory.EUAMM1,
  ].includes(category as TestCategory);
}

export function isAmod2Category(category: CategoryCode): boolean {
  return [
    TestCategory.EUAM2,
    TestCategory.EUA1M2,
    TestCategory.EUA2M2,
    TestCategory.EUAMM2,
  ].includes(category as TestCategory);
}

export function isBikeCategory(category: CategoryCode): boolean {
  return isAmod1Category(category) || isAmod2Category(category);
}

export function isHomeTestCategory(category: CategoryCode): boolean {
  return [
    TestCategory.F,
    TestCategory.G,
    TestCategory.H,
    TestCategory.K,
  ].includes(category as TestCategory);
}

export function isCPCCategory(category: CategoryCode): boolean {
  return [
    TestCategory.CCPC,
    TestCategory.DCPC,
  ].includes(category as TestCategory);
}

export function isManoeuvreCategory(category: CategoryCode): boolean {
  return [
    TestCategory.CM,
    TestCategory.C1M,
    TestCategory.CEM,
    TestCategory.C1EM,
    TestCategory.DM,
    TestCategory.D1M,
    TestCategory.DEM,
    TestCategory.D1EM,
  ].includes(category as TestCategory);
}

export function getTemplateString(
  conductedLanguage: ConductedLanguage,
  communicationMethod: CommunicationMethod,
  activityCode: ActivityCode,
  category: CategoryCode,
): string {

  const languageOfTemplate: TemplateLanguage =
        (conductedLanguage === Language.WELSH) ? TemplateLanguage.WELSH : TemplateLanguage.ENGLISH;

  const correspondenceMethod: CorrespondenceMethod =
        (communicationMethod === Correspondence.POST) ? Correspondence.LETTER : Correspondence.EMAIL;

  if (isPass(activityCode)) {
    return (category === TestCategory.ADI3 || category === TestCategory.SC)
      ? `${languageOfTemplate}${correspondenceMethod}TemplateId`
      : `${languageOfTemplate}${correspondenceMethod}PassTemplateId`;
  }
  if (isFail(activityCode)) {
    return (category === TestCategory.ADI3 || category === TestCategory.SC)
      ? `${languageOfTemplate}${correspondenceMethod}TemplateId`
      : `${languageOfTemplate}${correspondenceMethod}FailTemplateId`;
  }
  return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
}
