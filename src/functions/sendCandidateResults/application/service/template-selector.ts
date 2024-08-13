import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {Language} from '../../domain/conducted-language';
import {headerTemplate, headerWelshTemplate} from '../templates/header';
import {failResultTemplate, failResultWelshTemplateAdi2, passResultTemplate} from '../templates/result-summary';
import {
  testExperienceSurveyRidingTemplate,
  testExperienceSurveyTemplate,
  testExperienceSurveyTemplate3b,
} from '../templates/test-experience-survey';
import {dataPrivacyTemplate, dataPrivacyWelshTemplate} from '../templates/data-privacy';
import {TestOutcome} from '../../domain/test-outcome';
import {etaTemplate, etaWelshTemplate} from '../templates/eta';
import {dangerousFaultsTemplate, dangerousFaultsWelshTemplate} from '../templates/dangerous-faults';
import {seriousFaultsTemplate, seriousFaultsWelshTemplate} from '../templates/serious-faults';
import {
  drivingFaultsTemplate, drivingFaultsWelshTemplate,
  ridingFaultTemplate,
  vocationalScoring,
  vocationalScoringExplanation,
} from '../templates/driving-faults';
import {
  nextStepsADI2FailTemplate,
  nextStepsAdi2PassTemplate, nextStepsAdi2WelshFailTemplate,
  nextStepsAdi3FirstOrSecondFailTemplate,
  nextStepsAdi3PassTemplate,
  nextStepsAdi3ThirdFailTemplate,
  nextStepsDrivingTemplate,
  nextStepsFailBTemplate,
  nextStepsMod1PassTemplate,
  NextStepsPass3aTemplate,
  nextStepsScFirstOrSecondTemplate,
  nextStepsScThirdTemplate,
} from '../templates/next-steps';
import {getCategorySubject, getCategoryType, isADI3Category} from './category-provider';
import {
  adiEnglishSubject,
  adiWelshSubject,
  cpcEnglishSubject,
  cpcWelshSubject,
  drivingEnglishSubject,
  drivingWelshSubject,
  padiEnglishSubject,
  padiWelshSubject,
  ridingEnglishSubject,
  ridingWelshSubject,
} from '../templates/email-subject';
import {emergencyStopTemplate} from '../templates/emergency-stop';
import {avoidanceExerciseTemplate} from '../templates/avoidance-exercise';
import {gradeTemplate} from '../templates/grade';
import {
  statementOfFailureBTemplate,
  statementOfFailureMod1Template,
  statementOfFailureMod2Template,
  statementOfFailureTractorTemplate,
  statementOfFailureVocational3bTemplate,
} from '../templates/statement-of-failure';
import {
  FailUrls,
  PassUrls,
  understandingResultTemplate, understandingResultWelshTemplate,
  UrlDescriptors,
  UrlDescriptorsWelsh,
} from '../templates/understanding-your-result';
import {AppealUrls, howToAppealTemplate, howToAppealWelshTemplate} from '../templates/appeal-your-test';
import {signOffTemplate, signOffWelshTemplate} from '../templates/sign-off';
import {
  importantInformationForHGVAndBusVocational3bTemplate,
  importantInformationForHGVAndBusVocational4Template,
  statementOfFailureVocational4,
  vocationalIfYouWantToDriveTemplate3b,
  vocationalIfYouWantToDriveTemplate4,
} from '../templates/vocational-additional-info';
import {
  importantInfoForDriversB,
  importantInfoForDriversSc,
  importantInfoForDriversTractor,
  importantInfoForNewDriversAdi3,
  importantInfoForRiders,
} from '../templates/info-for-new-drivers';
import {ecoTemplate, ecoWelshTemplate} from '../templates/eco';

// ADI2
export const passEnglishAdi2 =
    `
    ${headerTemplate}
    ${passResultTemplate('ADI part 2 (driving ability) test', TestCategory.ADI2)}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.ADI2, PassUrls.ADI2)}
    ${nextStepsAdi2PassTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishAdi2 =
    `
    ${headerTemplate}
    ${failResultTemplate('ADI part 2 (driving ability) test', TestCategory.ADI2)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.ADI2, FailUrls.ADI2, true)}
    ${nextStepsADI2FailTemplate}
    ${howToAppealTemplate(AppealUrls.ADI2, TestCategory.ADI2)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failWelshAdi2 =
    `
    ${headerWelshTemplate}
    ${failResultWelshTemplateAdi2}
    ${etaWelshTemplate}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.ADI2, FailUrls.ADI2, true)}
    ${nextStepsAdi2WelshFailTemplate}
    ${howToAppealWelshTemplate(AppealUrls.ADI2, TestCategory.ADI2)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
    `;

// ADI3
export const passEnglishAdi3 = `
    ${headerTemplate}
    ${passResultTemplate('ADI part 3 (instructional ability) test', TestCategory.ADI3)}
    ${gradeTemplate}
    ${nextStepsAdi3PassTemplate}
    ${importantInfoForNewDriversAdi3}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishAdi3FirstOrSecondAttempt = `
    ${headerTemplate}
    ${failResultTemplate('ADI part 3 (instructional ability) test', TestCategory.ADI3)}
    ${gradeTemplate}
    ${nextStepsAdi3FirstOrSecondFailTemplate}
    ${howToAppealTemplate(AppealUrls.ADI3_1ST_OR_2ND, TestCategory.ADI3)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishAdi3ThirdAttempt = `
    ${headerTemplate}
    ${failResultTemplate('ADI part 3 (instructional ability) test', TestCategory.ADI3, true)}
    ${gradeTemplate}
    ${nextStepsAdi3ThirdFailTemplate}
    ${howToAppealTemplate(AppealUrls.ADI3_3RD, TestCategory.ADI3)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

// SC
export const passEnglishSc = `
    ${headerTemplate}
    ${passResultTemplate('ADI standards check', TestCategory.SC)}
    ${gradeTemplate}
    ${importantInfoForDriversSc}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishScFirstOrSecondAttempt = `
    ${headerTemplate}
    ${failResultTemplate('ADI standards check', TestCategory.SC)}
    ${gradeTemplate}
    ${nextStepsScFirstOrSecondTemplate}
    ${howToAppealTemplate(AppealUrls.SC_1ST_OR_2ND, TestCategory.SC)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishScThirdAttempt = `
    ${headerTemplate}
    ${failResultTemplate('ADI standards check', TestCategory.SC, true)}
    ${gradeTemplate}
    ${nextStepsScThirdTemplate}
    ${howToAppealTemplate(AppealUrls.SC_3RD, TestCategory.SC)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

// B
export const passEnglishB = `
    ${headerTemplate}
    ${passResultTemplate('car driving test', TestCategory.B)}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, PassUrls.B)}
    ${nextStepsDrivingTemplate}
    ${testExperienceSurveyTemplate}
    ${importantInfoForDriversB}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishB = `
    ${headerTemplate}
    ${failResultTemplate('car driving test', TestCategory.B)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, FailUrls.B, true)}
    ${nextStepsFailBTemplate}
    ${testExperienceSurveyTemplate}
    ${statementOfFailureBTemplate}
    ${howToAppealTemplate(AppealUrls.B, TestCategory.B)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

// MOD1
export const passEnglishAMod1 = `
    ${headerTemplate}
    ${passResultTemplate('motorcycle module 1 (off-road) test', TestCategory.EUAM1)}
    ${ridingFaultTemplate}
    ${emergencyStopTemplate}
    ${avoidanceExerciseTemplate}
    ${ecoTemplate(true)}
    ${understandingResultTemplate(UrlDescriptors.RIDING, PassUrls.MOD1)}
    ${nextStepsMod1PassTemplate}
    ${testExperienceSurveyRidingTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishAMod1 = `
    ${headerTemplate}
    ${failResultTemplate('motorcycle module 1 (off-road) test', TestCategory.EUAM1)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${ridingFaultTemplate}
    ${emergencyStopTemplate}
    ${avoidanceExerciseTemplate}
    ${ecoTemplate(true)}
    ${understandingResultTemplate(UrlDescriptors.RIDING, FailUrls.MOD1, true)}
    ${testExperienceSurveyRidingTemplate}
    ${statementOfFailureMod1Template}
    ${howToAppealTemplate(AppealUrls.MOD1, TestCategory.EUAM1, true)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

// MOD2
export const passEnglishAMod2 =
    `
    ${headerTemplate}
    ${passResultTemplate('motorcycle module 2 (on-road) test', TestCategory.EUAM2)}
    ${ridingFaultTemplate}
    ${ecoTemplate(true)}
    ${understandingResultTemplate(UrlDescriptors.RIDING, PassUrls.MOD2)}
    ${nextStepsDrivingTemplate}
    ${testExperienceSurveyRidingTemplate}
    ${importantInfoForRiders}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishAMod2 =
    `
    ${headerTemplate}
    ${failResultTemplate('motorcycle module 2 (on-road) test', TestCategory.EUAM2)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${ridingFaultTemplate}
    ${ecoTemplate(true)}
    ${understandingResultTemplate(UrlDescriptors.RIDING, FailUrls.MOD2, true)}
    ${testExperienceSurveyRidingTemplate}
    ${statementOfFailureMod2Template}
    ${howToAppealTemplate(AppealUrls.MOD2, TestCategory.EUAM2, true)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// Tractor
export const passEnglishHome =
    `
    ${headerTemplate}
    ${passResultTemplate('tractor or specialist vehicle driving test', TestCategory.F)}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, PassUrls.TRACTOR)}
    ${nextStepsDrivingTemplate}
    ${importantInfoForDriversTractor}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishHome =
    `
    ${headerTemplate}
    ${failResultTemplate('tractor or specialist vehicle driving test', TestCategory.F)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, FailUrls.TRACTOR, true)}
    ${statementOfFailureTractorTemplate}
    ${howToAppealTemplate(AppealUrls.TRACTOR, TestCategory.F)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// Manoeuvres
export const passEnglishMan =
    `
    ${headerTemplate}
    ${passResultTemplate('Driver CPC part 3a (off-road exercises) test', TestCategory.C1M)}
    ${NextStepsPass3aTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishMan =
    `
    ${headerTemplate}
    ${failResultTemplate('Driver CPC part 3a (off-road exercises) test', TestCategory.C1M)}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, FailUrls.MANOEUVRES, true)}
    ${statementOfFailureVocational3bTemplate}
    ${howToAppealTemplate(AppealUrls.MANOEUVRES, TestCategory.C1M)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// Vocational
export const passEnglishVocational =
    `
    ${headerTemplate}
    ${passResultTemplate('Driver CPC part 3b (on-road driving) test', TestCategory.C)}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, PassUrls.VOCATIONAL)}
    ${nextStepsDrivingTemplate}
    ${testExperienceSurveyTemplate3b}
    ${vocationalIfYouWantToDriveTemplate3b}
    ${importantInformationForHGVAndBusVocational3bTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishVocational =
    `
    ${headerTemplate}
    ${failResultTemplate('Driver CPC part 3b (on-road driving) test', TestCategory.C)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, FailUrls.VOCATIONAL, true)}
    ${testExperienceSurveyTemplate3b}
    ${statementOfFailureVocational3bTemplate}
    ${howToAppealTemplate(AppealUrls.VOCATIONAL, TestCategory.C)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// CPC
export const passEnglishCpc =
    `
    ${headerTemplate}
    ${passResultTemplate('Driver CPC part 4 (practical demonstration) test', TestCategory.CCPC)}
    ${vocationalScoringExplanation}
    ${vocationalScoring}
    ${vocationalIfYouWantToDriveTemplate4}
    ${importantInformationForHGVAndBusVocational4Template}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishCpc =
    `
    ${headerTemplate}
    ${failResultTemplate('Driver CPC part 4 (practical demonstration) test', TestCategory.CCPC)}
    ${vocationalScoringExplanation}
    ${vocationalScoring}
    ${statementOfFailureVocational4}
    ${howToAppealTemplate(AppealUrls.CPC, TestCategory.CCPC)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

/**
 * Select subject based upon category & language
 * types: Driving | Riding | ADI3
 * @param category
 * @param language
 */
export function subjectMapper(category: TestCategory, language: Language) {
  const subjectType = getCategorySubject(category);
  return (emailSubjects as Record<string, string>)[`${subjectType}${language}Subject`] || '';
}

/**
 * Select template based upon category, test outcome & language
 * Note: ADI3/SC follows a different pattern
 * @param testOutcome
 * @param category
 * @param language
 * @param previousAttempts
 */
// eslint-disable-next-line max-len
export function templateMapper(testOutcome: TestOutcome, category: TestCategory, language: Language, previousAttempts?: number) {
  const testType= getCategoryType(category);
  let previousAttemptsText: string = '';
  if (isADI3Category(category) && testOutcome === 'fail') {
    if (previousAttempts && previousAttempts > 1) {
      previousAttemptsText = 'ThirdAttempt';
    } else previousAttemptsText = 'FirstOrSecondAttempt';
  }
  return (templates as Record<string, string>)[`${testOutcome}${language}${testType}${previousAttemptsText}`];
}

const templates = {
  passEnglishAdi2,
  failEnglishAdi2,
  failWelshAdi2,
  passEnglishAdi3,
  failEnglishAdi3FirstOrSecondAttempt,
  failEnglishAdi3ThirdAttempt,
  passEnglishSc,
  failEnglishScFirstOrSecondAttempt,
  failEnglishScThirdAttempt,
  passEnglishB,
  failEnglishB,
  passEnglishAMod1,
  failEnglishAMod1,
  passEnglishAMod2,
  failEnglishAMod2,
  passEnglishHome,
  failEnglishHome,
  passEnglishMan,
  failEnglishMan,
  passEnglishVocational,
  failEnglishVocational,
  passEnglishCpc,
  failEnglishCpc,
};

const emailSubjects = {
  drivingEnglishSubject,
  drivingWelshSubject,
  ridingEnglishSubject,
  ridingWelshSubject,
  adiEnglishSubject,
  adiWelshSubject,
  padiEnglishSubject,
  padiWelshSubject,
  cpcEnglishSubject,
  cpcWelshSubject,
};
