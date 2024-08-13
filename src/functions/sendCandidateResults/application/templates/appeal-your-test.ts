/* eslint-disable max-len */
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export enum AppealUrls {
  ADI2 = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=unsuccessful',
  ADI3_1ST_OR_2ND = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd',
  ADI3_3RD = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-3rd',
  SC_1ST_OR_2ND = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-1st-2nd',
  SC_3RD = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd',
  B = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=unsuccessful',
  MOD1 = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=unsuccessful',
  MOD2 = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=unsuccessful',
  TRACTOR = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=unsuccessful',
  MANOEUVRES = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=unsuccessful',
  VOCATIONAL = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=unsuccessful',
  CPC = 'https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=unsuccessful',
}

const getTestType = (category: TestCategory, riding: boolean): string => {
  switch (category) {
  case TestCategory.ADI3:
    return 'test';
  case TestCategory.SC:
    return 'standards check';
  default:
    return riding ? 'motorcycle test' : 'driving test';
  }
};

const getWelshTestType = (category: TestCategory, riding: boolean): string => {
  switch (category) {
  case TestCategory.ADI3:
    return 'prawf';
  case TestCategory.SC:
    return 'gwiriad safonau';
  default:
    return riding ? 'prawf beic modur' : 'prawf gyrru';
  }
};

export const howToAppealTemplate = (url: string, category: TestCategory, riding: boolean = false): string => {
  return  `
# How to appeal your ${getTestType(category, riding)} 

You can appeal to a court if you think your ${[TestCategory.ADI3, TestCategory.SC].includes(category) ? '' : 'driving'} examiner did not follow the law about how they must carry out ${category === TestCategory.ADI3 ? 'ADI qualifying tests' : category === TestCategory.SC ? 'ADI standards checks' : 'driving tests'}.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](${url}).
`;
};

export const howToAppealWelshTemplate = (url: string, category: TestCategory, riding: boolean = false): string => {
  return  `
# Sut i apelio eich ${getWelshTestType(category, riding)}

Gallwch apelio at lys os credwch na ddilynodd eich arholwr ${[TestCategory.ADI3, TestCategory.SC].includes(category) ? '' : 'gyrru\'r'} gyfraith ynghylch sut y mae'n rhaid iddynt gynnal profion ${category === TestCategory.ADI3 ? 'cymhwyso ADI' : category === TestCategory.SC ? 'gwiriadau safonau ADI' : 'gyrru'}.

Ni all y llys newid canlyniad eich prawf. Os byddwch yn ennill eich apêl, gallant benderfynu y dylech naill ai'n: Mae'n bosibl y bydd yn rhaid i chi dalu costau cyfreithiol sylweddol os byddwch yn colli'ch apêl.

^[Darganfyddwch sut i apelio os credwch na ddilynodd eich archwiliwr y gyfraith](${url}). 
`;
};
