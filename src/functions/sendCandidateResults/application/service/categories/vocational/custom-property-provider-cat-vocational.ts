import {CategoryCode} from '@dvsa/mes-test-schema/categories/AM1';
import {CustomProperties} from '../../../../domain/custom-properties';
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export interface CatVocationalCustomProperties extends CustomProperties {
  showLGVText: boolean;
}

export const getCustomPropertiesCatVocational = (
  category: CategoryCode
): CatVocationalCustomProperties => {
  const showLGVFlag: boolean =
        category === TestCategory.C ||
        category === TestCategory.C1 ||
        category === TestCategory.CE ||
        category === TestCategory.C1E;

  return {
    showLGVText: showLGVFlag,
  };
};
