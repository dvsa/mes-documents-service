import isManoeuvreTest from '../is-manoeuvre-test';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('is-manoeuvre-test', () => {
  it('should return true when test category is a manoeuvre test', () => {
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

    manoeuvreCategories.forEach((category) => {
      expect(isManoeuvreTest(category)).toBe(true);
    });
  });

  it('should return false when test category is not a manoeuvre test', () => {
    const testResult = TestCategory.A;
    expect(isManoeuvreTest(testResult)).toBe(false);
  });

});
