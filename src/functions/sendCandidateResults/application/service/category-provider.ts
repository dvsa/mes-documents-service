import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { TestType } from '../../domain/template-id.model';
import { CategoryType } from '../../domain/category-type';

/**
 * Determine if test was performed on a bike for labeling
 * @param category
 */
export function isBikeCategory(category: CategoryCode): boolean {
  return [
    TestCategory.EUAM1,
    TestCategory.EUA1M1,
    TestCategory.EUA2M1,
    TestCategory.EUAMM1,
    TestCategory.EUAM2,
    TestCategory.EUA1M2,
    TestCategory.EUA2M2,
    TestCategory.EUAMM2,
  ].includes(category as TestCategory);
}

/**
 * Determine if test was performed of type ADI3 or SC
 * @param category
 */
export function isADI3Category(category: CategoryCode): boolean {
  return [
    TestCategory.ADI3,
    TestCategory.SC,
  ].includes(category as TestCategory);
}

/**
 * Determine if test was performed of type CPC
 * @param category
 */
export function isCPCCategory(category: CategoryCode): boolean {
  return [
    TestCategory.CCPC,
    TestCategory.DCPC,
  ].includes(category as TestCategory);
}

/**
 * Return test type based upon category
 * @param category
 */
export function getCategorySubject(category: TestCategory): CategoryType {
  return isADI3Category(category) ? CategoryType.ADI :
    isCPCCategory(category) ? CategoryType.CPC :
      isBikeCategory(category) ? CategoryType.RIDING :
        CategoryType.DRIVING;
}

/**
 * Return test type based upon category
 * @param category
 */
export function getCategoryType(category: TestCategory): TestType {
  switch (category) {
  case TestCategory.ADI2:
    return TestType.ADI2;
  case TestCategory.ADI3:
  case TestCategory.SC:
    return TestType.ADI3;
  case TestCategory.B:
    return TestType.B;
  case TestCategory.C:
  case TestCategory.C1:
  case TestCategory.CE:
  case TestCategory.C1E:
  case TestCategory.D:
  case TestCategory.D1:
  case TestCategory.DE:
  case TestCategory.D1E:
    return TestType.VOCATIONAL;
  case TestCategory.CCPC:
  case TestCategory.DCPC:
    return TestType.CPC;
  case TestCategory.F:
  case TestCategory.G:
  case TestCategory.H:
  case TestCategory.K:
    return TestType.HOME;
  case TestCategory.EUA1M1:
  case TestCategory.EUA2M1:
  case TestCategory.EUAM1:
  case TestCategory.EUAMM1:
    return TestType.AMOD1;
  case TestCategory.EUA1M2:
  case TestCategory.EUA2M2:
  case TestCategory.EUAM2:
  case TestCategory.EUAMM2:
    return TestType.AMOD2;
  case TestCategory.CM:
  case TestCategory.C1M:
  case TestCategory.CEM:
  case TestCategory.C1EM:
  case TestCategory.DM:
  case TestCategory.D1M:
  case TestCategory.DEM:
  case TestCategory.D1EM:
    return TestType.MANOEUVRE;
  default:
    throw new Error(`Unexpected category type: ${category}`);
  }
}
