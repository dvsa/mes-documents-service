import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  isBikeCategory,
  isADI3Category,
  getCategoryType,
  getCategorySubject,
  isCPCCategory,
} from '../category-provider';
import { TestType } from '../../../domain/template-id.model';
import { CategoryType } from '../../../domain/category-type';

describe('isBikeCategory', () => {
  it('should return true for bike categories', () => {
    const bikeCategories = [
      TestCategory.EUAM1,
      TestCategory.EUA1M1,
      TestCategory.EUA2M1,
      TestCategory.EUAMM1,
      TestCategory.EUAM2,
      TestCategory.EUA1M2,
      TestCategory.EUA2M2,
      TestCategory.EUAMM2,
    ];

    bikeCategories.forEach((category) => {
      expect(isBikeCategory(category)).toBe(true);
    });
  });

  it('should return false for non-bike categories', () => {
    const nonBikeCategories = [
      TestCategory.ADI2,
      TestCategory.B,
      TestCategory.C,
    ];

    nonBikeCategories.forEach((category) => {
      expect(isBikeCategory(category)).toBe(false);
    });
  });
});

describe('isADI3Category', () => {
  it('should return true for ADI3 and SC categories', () => {
    const adi3Categories = [
      TestCategory.ADI3,
      TestCategory.SC,
    ];

    adi3Categories.forEach((category) => {
      expect(isADI3Category(category)).toBe(true);
    });
  });

  it('should return false for non-ADI3 and non-SC categories', () => {
    const nonAdi3Categories = [
      TestCategory.B,
      TestCategory.C,
    ];

    nonAdi3Categories.forEach((category) => {
      expect(isADI3Category(category)).toBe(false);
    });
  });
});

describe('isCPCCategory', () => {
  it('should return true for CPC categories', () => {
    const cpcCategories = [
      TestCategory.CCPC,
      TestCategory.DCPC,
    ];

    cpcCategories.forEach((category) => {
      expect(isCPCCategory(category)).toBe(true);
    });
  });

  it('should return false for non-CPC categories', () => {
    const nonCpcCategories = [
      TestCategory.B,
      TestCategory.C,
    ];

    nonCpcCategories.forEach((category) => {
      expect(isCPCCategory(category)).toBe(false);
    });
  });
});

describe('getCategorySubject', () => {
  it('should return CategoryType.ADI for ADI3 and SC categories', () => {
    const adi3Categories = [
      TestCategory.ADI3,
      TestCategory.SC,
    ];

    adi3Categories.forEach((category) => {
      expect(getCategorySubject(category)).toBe(CategoryType.ADI);
    });
  });

  it('should return CategoryType.CPC for CPC categories', () => {
    const cpcCategories = [
      TestCategory.CCPC,
      TestCategory.DCPC,
    ];

    cpcCategories.forEach((category) => {
      expect(getCategorySubject(category)).toBe(CategoryType.CPC);
    });
  });

  it('should return CategoryType.RIDING for bike categories', () => {
    const bikeCategories = [
      TestCategory.EUAM1,
      TestCategory.EUA1M1,
      TestCategory.EUA2M1,
      TestCategory.EUAMM1,
      TestCategory.EUAM2,
      TestCategory.EUA1M2,
      TestCategory.EUA2M2,
      TestCategory.EUAMM2,
    ];

    bikeCategories.forEach((category) => {
      expect(getCategorySubject(category)).toBe(CategoryType.RIDING);
    });
  });

  it('should return CategoryType.DRIVING for other categories', () => {
    const otherCategories = [
      TestCategory.B,
      TestCategory.C,
    ];

    otherCategories.forEach((category) => {
      expect(getCategorySubject(category)).toBe(CategoryType.DRIVING);
    });
  });
});

describe('getCategoryType', () => {
  it('should return TestType.ADI2 for TestCategory.ADI2', () => {
    expect(getCategoryType(TestCategory.ADI2)).toBe(TestType.ADI2);
  });

  it('should return TestType.ADI3 for TestCategory.ADI3 and TestCategory.SC', () => {
    const adi3Categories = [
      TestCategory.ADI3,
      TestCategory.SC,
    ];

    adi3Categories.forEach((category) => {
      expect(getCategoryType(category)).toBe(TestType.ADI3);
    });
  });

  it('should return TestType.B for TestCategory.B', () => {
    expect(getCategoryType(TestCategory.B)).toBe(TestType.B);
  });

  it('should return TestType.VOCATIONAL for various vocational categories', () => {
    const vocationalCategories = [
      TestCategory.C,
      TestCategory.C1,
      TestCategory.CE,
      TestCategory.C1E,
      TestCategory.D,
      TestCategory.D1,
      TestCategory.DE,
      TestCategory.D1E,
    ];

    vocationalCategories.forEach((category) => {
      expect(getCategoryType(category)).toBe(TestType.VOCATIONAL);
    });
  });

  it('should return TestType.HOME for home categories', () => {
    const homeCategories = [
      TestCategory.F,
      TestCategory.G,
      TestCategory.H,
      TestCategory.K,
    ];

    homeCategories.forEach((category) => {
      expect(getCategoryType(category)).toBe(TestType.HOME);
    });
  });

  it('should return TestType.AMOD1 for various AMOD1 categories', () => {
    const amod1Categories = [
      TestCategory.EUA1M1,
      TestCategory.EUA2M1,
      TestCategory.EUAM1,
      TestCategory.EUAMM1,
    ];

    amod1Categories.forEach((category) => {
      expect(getCategoryType(category)).toBe(TestType.AMOD1);
    });
  });

  it('should return TestType.AMOD2 for various AMOD2 categories', () => {
    const amod2Categories = [
      TestCategory.EUA1M2,
      TestCategory.EUA2M2,
      TestCategory.EUAM2,
      TestCategory.EUAMM2,
    ];

    amod2Categories.forEach((category) => {
      expect(getCategoryType(category)).toBe(TestType.AMOD2);
    });
  });

  it('should return TestType.MANOEUVRE for various manoeuvre categories', () => {
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
      expect(getCategoryType(category)).toBe(TestType.MANOEUVRE);
    });
  });

  it('should throw an error for unknown categories', () => {
    expect(() => getCategoryType(TestCategory.A)).toThrowError('Unexpected category type: A');
  });
});
