import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { isDES3ManoeuvreTest } from '../is-manoeuvre-test';

describe('isDES3ManoeuvreTest', () => {
  const manoeuvreCategories = [
    TestCategory.CM,
    TestCategory.C1M,
    TestCategory.CEM,
    TestCategory.C1EM,
    TestCategory.DM,
    TestCategory.D1M,
    TestCategory.DEM,
    TestCategory.D1EM,
  ];

  it('should return false when test category is a manoeuvre test from DES4', () => {
    manoeuvreCategories.forEach((category) => {
      expect(isDES3ManoeuvreTest(category, '4.1')).toBe(false);
    });
  });

  it('should return true when test category is a manoeuvre test coming from DES3', () => {
    manoeuvreCategories.forEach((category) => {
      expect(isDES3ManoeuvreTest(category, '3.1')).toBe(true);
    });
  });

  it('should return false when test category is not a manoeuvre test', () => {
    const testResult = TestCategory.A;
    expect(isDES3ManoeuvreTest(testResult, '4.1')).toBe(false);
  });
});
