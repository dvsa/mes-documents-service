import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { injectable } from 'inversify';
import {
  getCustomPropertiesCatAMod1,
} from './categories/AM1/custom-property-provider-cat-a-mod1';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { CustomProperties } from '../../domain/custom-properties';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { get } from 'lodash';

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

    switch (category) {
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return getCustomPropertiesCatAMod1(testResult.testData as CatAMod1TestData, language);
      default: return {};
    }
  }
}
