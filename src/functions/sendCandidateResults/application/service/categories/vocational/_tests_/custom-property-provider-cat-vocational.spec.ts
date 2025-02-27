import { getCustomPropertiesCatVocational } from '../custom-property-provider-cat-vocational';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('getCustomPropertiesCatVocational', () => {
  it('should return showLGVText as true for LGV categories', () => {
    expect(getCustomPropertiesCatVocational(TestCategory.C).showLGVText).toBe(true);
    expect(getCustomPropertiesCatVocational(TestCategory.C1).showLGVText).toBe(true);
    expect(getCustomPropertiesCatVocational(TestCategory.CE).showLGVText).toBe(true);
    expect(getCustomPropertiesCatVocational(TestCategory.C1E).showLGVText).toBe(true);
  });

  it('should return showLGVText as false for non-LGV categories', () => {
    expect(getCustomPropertiesCatVocational(TestCategory.D).showLGVText).toBe(false);
    expect(getCustomPropertiesCatVocational(TestCategory.D1).showLGVText).toBe(false);
    expect(getCustomPropertiesCatVocational(TestCategory.DE).showLGVText).toBe(false);
    expect(getCustomPropertiesCatVocational(TestCategory.D1E).showLGVText).toBe(false);
  });
});
