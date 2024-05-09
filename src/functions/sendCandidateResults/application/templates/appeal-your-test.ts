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
const categoryLabels = {
  [TestCategory.ADI3]: 'ADI qualifying tests',
  [TestCategory.SC]: 'ADI standards checks',
};


export const howToAppealTemplate = (url: string, category: TestCategory) => {
  `# How to appeal your driving test

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out ${categoryLabels[category] || 'driving tests'}.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](${url}).
`;
};
export const howToAppealBTemplate = `
# How to appeal your driving test

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=unsuccessful).
`;

export const howToAppealTractorTemplate = `
## How to appeal your driving test 

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests. 

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs. 

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=unsuccessful).  
`;

export const howToAppealAdi3FirstOrSecondTemplate = `
# How to appeal your test

You can appeal to a court if you think your examiner did not follow the law about how they must carry out ADI qualifying tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-1st-2nd).
`;

export const howToAppealAdi3ThirdTemplate = `
You can appeal to a court if you think your examiner did not follow the law about how they must carry out ADI qualifying tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-3-test&utm_content=unsuccessful-3rd).
`;

export const appealYourAdi2TestTemplate = `
# How to appeal your test

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=unsuccessful).
`;

export const howToAppealScFirstOrSecondTemplate = `
# How to appeal your standards check

You can appeal to a court if you think your examiner did not follow the law about how they must carry out ADI standards checks.

The court cannot change your test result. If you win your appeal, they can decide you should be allowed to take another standards check. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-1st-2nd).
`;

export const howToAppealScThirdTemplate = `
# How to appeal your standards check

You can appeal to a court if you think your examiner did not follow the law about how they must carry out ADI standards checks.

The court cannot change your test result. If you win your appeal, they can decide you should be allowed to take another standards check. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-standards-check&utm_content=unsuccessful-3rd).
`;

export const howToAppeal3aTemplate = `
## How to appeal your driving test

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=unsuccessful).

`;

export const howToAppeal3bTemplate = `
## How to appeal your driving test

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^ [Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=unsuccessful). 

`;

export const howToAppeal4Template = `
## How to appeal your driving test

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-4-test&utm_content=unsuccessful).
`;
