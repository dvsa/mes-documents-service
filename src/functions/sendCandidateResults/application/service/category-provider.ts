
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

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
