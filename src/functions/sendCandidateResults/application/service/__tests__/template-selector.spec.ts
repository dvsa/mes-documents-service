import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { subjectMapper, templateMapper } from '../template-selector';
import { Language } from '../../../domain/conducted-language';
import { TestOutcome } from '../../../domain/test-outcome';

const drivingCategories = [
  TestCategory.B,
  TestCategory.ADI2,
];

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

const adiCategories = [
  TestCategory.ADI3,
  TestCategory.SC,
];

const cpcCategories = [
  TestCategory.CCPC,
  TestCategory.DCPC,
];

describe('Subject Mapper', () => {
  it('should return the correct subject for a driving test in English', () => {
    drivingCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.ENGLISH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Your driving test result on {{ date }} – Driving test reference number: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for a driving test in Welsh', () => {
    drivingCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.WELSH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Canlyniad eich prawf gyrru ar {{ date }} - Cyfeirnod prawf gyrru: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for all riding tests in English', () => {
    bikeCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.ENGLISH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Your motorcycle test result on {{ date }} – Motorcycle test reference number: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for all riding tests in Welsh', () => {
    bikeCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.WELSH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Canlyniad eich prawf Beic Modur ar {{ date }} - Cyfeirnod y prawf Beic Modur: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for all adi3/sc tests in English', () => {
    adiCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.ENGLISH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Your {{ categoryDescriptor }} test result on {{ date }} – Test reference number: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for all adi3/sc tests in Welsh', () => {
    adiCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.WELSH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Canlyniad eich prawf {{ categoryDescriptor }} ar {{ date }} – Cyfeirnod prawf gyrru: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for all cpc tests in English', () => {
    cpcCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.ENGLISH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Your test result on {{ date }} – CPC Module 4 reference number: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for all cpc tests in Welsh', () => {
    cpcCategories.forEach((category) => {
      const subject = subjectMapper(category, Language.WELSH);
      // eslint-disable-next-line max-len
      expect(subject).toContain('Canlyniad eich prawf ar {{ date }} – CPC Modiwl 4 rhif cyfeirnod: {{ applicationReference }}');
    });
  });

  it('should return the correct subject for padi when english', () => {
    const subject = subjectMapper(TestCategory.B, Language.ENGLISH, true);
    // eslint-disable-next-line max-len
    expect(subject).toContain('{{#if isADI3}}ADI Part 3 – 3rd Attempt Fail{{/if}}{{#if isSC}}ADI SC – 3rd Attempt Fail{{/if}}');
  });

  it('should return the correct subject for padi when Welsh', () => {
    const subject = subjectMapper(TestCategory.B, Language.WELSH, true);
    // eslint-disable-next-line max-len
    expect(subject).toContain('{{#if isADI3}}ADI Part 3 – 3rd Attempt Fail{{/if}}{{#if isSC}}ADI SC – 3rd Attempt Fail{{/if}}');
  });
});

describe('Template Mapper', () => {
  // CatAmod1
  it('should return the correct template for a pass in English for A Mod 1', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.EUA1M1, Language.ENGLISH);
    expect(template).toContain('Motorcycle test reference number');
  });

  it('should return the correct template for a pass in Welsh for A Mod 1', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.EUA1M1, Language.WELSH);
    expect(template).toContain('Cyfeirnod y prawf Beic Modur');
  });

  it('should return the correct template for a fail in English for A Mod 1', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.EUA1M1, Language.ENGLISH);
    expect(template).toContain('Motorcycle test reference number');
  });

  it('should return the correct template for a fail in Welsh for A Mod 1', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.EUA1M1, Language.WELSH);
    expect(template).toContain('Cyfeirnod y prawf Beic Modur');
  });

  // CatAmod2
  it('should return the correct template for a pass in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.EUA1M2, Language.ENGLISH);
    expect(template).toContain('Motorcycle test reference number');
  });

  it('should return the correct template for a pass in Welsh for A Mod 2', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.EUA1M2, Language.WELSH);
    expect(template).toContain('Cyfeirnod y prawf Beic Modur');
  });

  it('should return the correct template for a fail in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.EUA1M2, Language.ENGLISH);
    expect(template).toContain('Motorcycle test reference number');
  });

  it('should return the correct template for a fail in Welsh for A Mod 2', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.EUA1M2, Language.WELSH);
    expect(template).toContain('Cyfeirnod y prawf Beic Modur');
  });

  // ADI2
  it('should return the correct template for a pass in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.ADI2, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a pass in Welsh for A Mod 2', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.ADI2, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  it('should return the correct template for a fail in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.ADI2, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in Welsh for A Mod 2', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.ADI2, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  // CatB
  it('should return the correct template for a pass in English for B', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.B, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a pass in Welsh for B', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.B, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  it('should return the correct template for a fail in English for B', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.B, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in Welsh for B', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.B, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  // Vocational
  it('should return the correct template for a pass in English for Vocational tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.C, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a pass in Welsh for Vocational tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.C, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  it('should return the correct template for a fail in English for Vocational tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.C, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in Welsh for Vocational tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.C, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  // Manoeuvre
  it('should return the correct template for a pass in English for Manoeuvre tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.CM, Language.ENGLISH);
    expect(template).toContain('Module 3a test');
  });

  it('should return the correct template for a pass in Welsh for Manoeuvre tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.CM, Language.WELSH);
    expect(template).toContain('Prawf Modiwl 3a');
  });

  it('should return the correct template for a fail in English for Manoeuvre tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.CM, Language.ENGLISH);
    expect(template).toContain('Module 3a test');
  });

  it('should return the correct template for a fail in Welsh for Manoeuvre tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.CM, Language.WELSH);
    expect(template).toContain('Prawf Modiwl 3a');
  });

  // Cpc
  it('should return the correct template for a pass in English for CPC tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.CCPC, Language.ENGLISH);
    expect(template).toContain('CPC Module 4 reference number');
  });

  it('should return the correct template for a pass in Welsh for CPC tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.CCPC, Language.WELSH);
    expect(template).toContain('CPC Modiwl 4 rhif cyfeirnod');
  });

  it('should return the correct template for a fail in English for CPC tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.CCPC, Language.ENGLISH);
    expect(template).toContain('CPC Module 4 reference number');
  });

  it('should return the correct template for a fail in Welsh for CPC tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.CCPC, Language.WELSH);
    expect(template).toContain('CPC Modiwl 4 rhif cyfeirnod');
  });

  // Home
  it('should return the correct template for a pass in English for Home tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.F, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a pass in Welsh for Home tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.F, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

  it('should return the correct template for a fail in English for Home tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.F, Language.ENGLISH);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in Welsh for Home tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.F, Language.WELSH);
    expect(template).toContain('Cyfeirnod prawf gyrru');
  });

});
