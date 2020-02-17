import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestData } from '@dvsa/mes-test-schema/categories/common';
import { injectable } from 'inversify';
import {
  getCustomPropertiesCatAMod1,
} from './categories/AM1/custom-property-provider-cat-a-mod1';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';

export interface ICustomPropertyProvider {
  getCustomProperties(testData: TestData | undefined, category: string): any;
}

@injectable()
export class CustomPropertyProvider implements ICustomPropertyProvider {

  public getCustomProperties(testData: TestData | undefined, category: string): any {
    switch (category) {
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return getCustomPropertiesCatAMod1(testData as CatAMod1TestData);
      default: return {};
    }
  }
}
