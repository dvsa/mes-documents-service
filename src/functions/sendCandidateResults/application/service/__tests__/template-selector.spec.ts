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
    const subject = subjectMapper(drivingCategories[0], Language.ENGLISH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Your car driving test result');
  });

  it('should return the correct subject for a driving test in Welsh', () => {
    const subject = subjectMapper(drivingCategories[0], Language.WELSH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Eich canlyniad prawf gyrru');
  });

  it('should return the correct subject for all riding tests in English', () => {
    const subject = subjectMapper(bikeCategories[4], Language.ENGLISH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Your motorcycle module 2 test result');
  });

  it('should return the correct subject for all riding tests in Welsh', () => {
    const subject = subjectMapper(bikeCategories[4], Language.WELSH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Canlyniad prawf beic modur modiwl 2');
  });

  it('should return the correct subject for all adi3/sc tests in English', () => {
    const subject = subjectMapper(adiCategories[1], Language.ENGLISH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Your ADI standards check result');
  });

  it('should return the correct subject for all adi3/sc tests in Welsh', () => {
    const subject = subjectMapper(adiCategories[1], Language.WELSH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Eich canlyniadau arolwg safonau ADI');
  });

  it('should return the correct subject for all cpc tests in English', () => {
    const subject = subjectMapper(cpcCategories[0], Language.ENGLISH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Your Driver CPC part 4 test result');
  });

  it('should return the correct subject for all cpc tests in Welsh', () => {
    const subject = subjectMapper(cpcCategories[0], Language.WELSH);
    // eslint-disable-next-line max-len
    expect(subject).toContain('Canlyniad eich prawf Gyrrwr CPC rhan 4');
  });
});

describe('Template Mapper', () => {
  // CatAmod1
  it('should return the correct template for a pass in English for A Mod 1', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.EUA1M1, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in English for A Mod 1', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.EUA1M1, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  // CatAmod2
  it('should return the correct template for a pass in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.EUA1M2, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.EUA1M2, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  // ADI2
  it('should return the correct template for a pass in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.ADI2, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in English for A Mod 2', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.ADI2, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  // CatB
  it('should return the correct template for a pass in English for B', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.B, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in English for B', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.B, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  // Vocational
  it('should return the correct template for a pass in English for Vocational tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.C, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in English for Vocational tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.C, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  // Manoeuvre
  it('should return the correct template for a pass in English for Manoeuvre tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.CM, Language.ENGLISH, false);
    expect(template).toContain('Driver CPC part 3a (off-road exercises) test');
  });

  it('should return the correct template for a fail in English for Manoeuvre tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.CM, Language.ENGLISH, false);
    expect(template).toContain('Driver CPC part 3a (off-road exercises) test');
  });

  // Cpc
  it('should return the correct template for a pass in English for CPC tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.CCPC, Language.ENGLISH, false);
    expect(template).toContain('Driver CPC part 4 (practical demonstration) test');
  });

  it('should return the correct template for a fail in English for CPC tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.CCPC, Language.ENGLISH, false);
    expect(template).toContain('Driver CPC part 4 (practical demonstration) test');
  });

  // Home
  it('should return the correct template for a pass in English for Home tests', () => {
    const template = templateMapper(TestOutcome.PASS, TestCategory.F, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

  it('should return the correct template for a fail in English for Home tests', () => {
    const template = templateMapper(TestOutcome.FAIL, TestCategory.F, Language.ENGLISH, false);
    expect(template).toContain('Driving test reference number');
  });

});
