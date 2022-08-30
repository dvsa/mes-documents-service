import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as CatCPCTestData } from '@dvsa/mes-test-schema/categories/CPC';
import { TestData as CatADI3TestData } from '@dvsa/mes-test-schema/categories/ADI3';
import { get } from 'lodash';
import { injectable } from 'inversify';
import { CustomProperties } from '../../domain/custom-properties';
import { getCustomPropertiesCatAMod1 } from './categories/AM1/custom-property-provider-cat-a-mod1';
import { getCustomPropertiesCatCPC } from './categories/CPC/custom-property-provider-cat-cpc';
import { getCustomPropertiesCatADI3 } from './categories/ADI3/custom-property-provider-cat-adi3';
export interface ICustomPropertyProvider {
  getCustomProperties(testData: TestResultSchemasUnion | undefined): any;
}

@injectable()
export class CustomPropertyProvider implements ICustomPropertyProvider {

  public getCustomProperties(testResult: TestResultSchemasUnion | undefined): CustomProperties {
    if (testResult === undefined) {
      throw new Error('No Test Result');
    }

    const category = testResult.category;
    const language = get(testResult, 'communicationPreferences.conductedLanguage');
    const testData = get(testResult, 'testData');
    const activityCode = get(testResult, 'activityCode');

    switch (category) {
    case TestCategory.ADI3:
      const prn = get(testResult, 'journalData.candidate.prn');
      return getCustomPropertiesCatADI3(testData as CatADI3TestData, activityCode, prn);
    case TestCategory.CCPC:
    case TestCategory.DCPC:
      return getCustomPropertiesCatCPC(testData as CatCPCTestData, category);
    case TestCategory.EUAM1:
    case TestCategory.EUA1M1:
    case TestCategory.EUA2M1:
    case TestCategory.EUAMM1:
      return getCustomPropertiesCatAMod1(testData as CatAMod1TestData, language);
    default: return {};
    }
  }
}
