import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Language } from '../../domain/conducted-language';
import { headerTemplate } from '../templates/header';
import {
  failAdi3FirstOrSecondTemplate,
  failAdi3ThirdTemplate, failAMod1Template,
  failDrivingAdi2Template, failDrivingBTemplate,
  failDrivingTemplate,
  failMod2Template,
  failScFirstOrSecondTemplate, failScThirdTemplate, failTractorTemplate,
  failVocational3bTemplate,
  failVocational4Template,
  passAdi3Template,
  passDrivingAdi2Template, passDrivingBTemplate,
  passDrivingTemplate,
  passMod2Template,
  passSCTemplate,
  passTractorTemplate,
  passVocational3bTemplate,
  passVocational4Template,
} from '../templates/result-summary';
import { improveYourDrivingVocationalManTemplate } from '../templates/improve-your-driving';
import {
  testExperienceSurveyBTemplate,
  testExperienceSurveyRidingTemplate,
  testExperienceSurveyTemplate,
  testExperienceSurveyTemplate3b,
  testExperienceSurveyVocationalTemplate,
} from '../templates/test-experience-survey';
import { dataPrivacyTemplate } from '../templates/data-privacy';
import { TestOutcome } from '../../domain/test-outcome';
import { etaTemplate } from '../templates/eta';
import { dangerousFaultsTemplate } from '../templates/dangerous-faults';
import { seriousFaultsTemplate } from '../templates/serious-faults';
import {
  drivingFaultsADI2Template,
  drivingFaultsTemplate,
  drivingFaultsTractorTemplate,
  DrivingFaultsVocationalTemplate,
  ridingFaultTemplate,
  vocationalScoring,
  vocationalScoringExplanation,
} from '../templates/driving-faults';
import {
  ecoRidingTemplate,
  ecoTemplate,
  ecoTemplate3b,
  ecoTemplateRider,
  ecoTemplateTractor,
} from '../templates/eco';
import {
  nextStepsADI2FailTemplate,
  nextStepsAdi2PassTemplate,
  nextStepsAdi3FirstOrSecondFailTemplate,
  nextStepsAdi3PassTemplate,
  nextStepsAdi3ThirdFailTemplate,
  nextStepsFailBTemplate,
  NextStepsPass3aTemplate,
  NextStepsPass3bTemplate,
  nextStepsPassBTemplate,
  nextStepsScFirstOrSecondTemplate,
  nextStepsScThirdTemplate,
  NextStepsVocationalFailTemplate,
  NextStepsVocationalPassTemplate,
} from '../templates/next-steps';
import { getCategorySubject, getCategoryType, isADI3Category } from './category-provider';
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
import {
  emergencyStopTemplate,
} from '../templates/emergency-stop';
import {
  avoidanceExerciseTemplate,
} from '../templates/avoidance-exercise';
import {
  adi3FirstOrSecondGradeTemplate,
  adi3GradeTemplate,
  scFirstOrSecondGradeTemplate,
  scGradeTemplate,
  scThirdGradeTemplate,
} from '../templates/grade';
import {
  statementOfFailureBTemplate,
  statementOfFailureMod1Template,
  statementOfFailureTemplate,
  statementOfFailureVocational3bTemplate,
  StatementOfFailureVocationalTemplate,
} from '../templates/statement-of-failure';
import {
  understanding3aFailResultTemplate,
  understanding3BFailResultTemplate,
  understanding3BPassResultTemplate,
  understandingAdi2FailResultTemplate,
  understandingAdi2PassResultTemplate,
  understandingBFailResultTemplate,
  understandingBPassResultTemplate,
  understandingMod1ResultTemplate,
  understandingMod2ResultTemplate,
  understandingTractorResultTemplate,
} from '../templates/understanding-your-result';
import {
  appealYourAdi2TestTemplate,
  howToAppealAdi3FirstOrSecondTemplate,
  howToAppealAdi3ThirdTemplate,
  howToAppealBTemplate,
  howToAppealScFirstOrSecondTemplate,
  howToAppealScThirdTemplate,
  howToAppealTemplate,
  howToAppealTractorTemplate,
} from '../templates/appeal-your-test';
import {signOffTemplate} from '../templates/sign-off';
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

export const passEnglishAdi2 =
   `${headerTemplate}
    ${passDrivingAdi2Template}
    ${drivingFaultsADI2Template}
    ${ecoTemplate}
    ${understandingAdi2PassResultTemplate}
    ${nextStepsAdi2PassTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishAdi2 =
  `
    ${headerTemplate}
    ${failDrivingAdi2Template}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsADI2Template}
    ${ecoTemplate}
    ${understandingAdi2FailResultTemplate}
    ${nextStepsADI2FailTemplate}
    ${appealYourAdi2TestTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const passEnglishAdi3 = `
    ${headerTemplate}
    ${passAdi3Template}
    ${adi3GradeTemplate}
    ${nextStepsAdi3PassTemplate}
    ${importantInfoForNewDriversAdi3}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishAdi3FirstOrSecondAttempt = `
    ${headerTemplate}
    ${failAdi3FirstOrSecondTemplate}
    ${adi3FirstOrSecondGradeTemplate}
    ${nextStepsAdi3FirstOrSecondFailTemplate}
    ${howToAppealAdi3FirstOrSecondTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishAdi3ThirdAttempt = `
    ${headerTemplate}
    ${failAdi3ThirdTemplate}
    ${adi3GradeTemplate}
    ${nextStepsAdi3ThirdFailTemplate}
    ${howToAppealAdi3ThirdTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const passEnglishSC = `
    ${headerTemplate}
    ${passSCTemplate}
    ${scGradeTemplate}
    ${importantInfoForDriversSc}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishSCFirstOrSecondAttempt = `
    ${headerTemplate}
    ${failScFirstOrSecondTemplate}
    ${scFirstOrSecondGradeTemplate}
    ${nextStepsScFirstOrSecondTemplate}
    ${howToAppealScFirstOrSecondTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishScThirdAttempt = `
    ${headerTemplate}
    ${failScThirdTemplate}
    ${scThirdGradeTemplate}
    ${nextStepsScThirdTemplate}
    ${howToAppealScThirdTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const passEnglishB = `
    ${headerTemplate}
    ${passDrivingBTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate}
    ${understandingBPassResultTemplate}
    ${nextStepsPassBTemplate}
    ${testExperienceSurveyBTemplate}
    ${importantInfoForDriversB}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failEnglishB = `
    ${headerTemplate}
    ${failDrivingBTemplate}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate}
    ${understandingBFailResultTemplate}
    ${nextStepsFailBTemplate}
    ${testExperienceSurveyBTemplate}
    ${statementOfFailureBTemplate}
    ${howToAppealBTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

// UPDATED
export const passEnglishVocational4 =
  `
    ${headerTemplate}
    ${passVocational4Template}
    ${vocationalScoringExplanation}
    ${vocationalScoring}
    ${vocationalIfYouWantToDriveTemplate4}
    ${importantInformationForHGVAndBusVocational4Template}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const failEnglishVocational4 =
  `
    ${headerTemplate}
    ${failVocational4Template}
    ${vocationalScoringExplanation}
    ${vocationalScoring}
    ${statementOfFailureVocational4}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;
// UPDATED
export const passEnglishVocational3a =
    `
    ${headerTemplate}
    ${passVocational3bTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate3b}
    ${understanding3BPassResultTemplate}
    ${NextStepsPass3aTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const failEnglishTractor =
  `
    ${headerTemplate}
    ${failTractorTemplate}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplateTractor}
    ${understandingTractorResultTemplate}
    ${statementOfFailureTemplate}
    ${howToAppealTractorTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const passEnglishTractor =
    `
    ${headerTemplate}
    ${passTractorTemplate}
    ${drivingFaultsTractorTemplate}
    ${ecoTemplateTractor}
    ${understandingTractorResultTemplate}
    ${NextStepsPass3aTemplate}
    ${importantInfoForDriversTractor}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const passEnglishMod2 =
    `
    ${headerTemplate}
    ${passMod2Template}
    ${ridingFaultTemplate}
    ${ecoTemplateRider}
    ${understandingMod2ResultTemplate}
    ${nextStepsPassBTemplate}
    ${testExperienceSurveyTemplate}
    ${importantInfoForRiders}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const failEnglishMod2 =
    `
    ${headerTemplate}
    ${failMod2Template}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${ridingFaultTemplate}
    ${ecoRidingTemplate}
    ${understandingMod2ResultTemplate}
    ${testExperienceSurveyTemplate}
    ${statementOfFailureTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const failEnglishVocational3a =
    `
    ${headerTemplate}
    ${failVocational3bTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${understanding3aFailResultTemplate}
    ${testExperienceSurveyTemplate3b}
    ${statementOfFailureVocational3bTemplate}
    ${howToAppealTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const passEnglishVocational3b =
    `
    ${headerTemplate}
    ${passVocational3bTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate3b}
    ${understanding3BPassResultTemplate}
    ${NextStepsPass3bTemplate}
    ${testExperienceSurveyTemplate3b}
    ${vocationalIfYouWantToDriveTemplate3b}
    ${importantInformationForHGVAndBusVocational3bTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

// UPDATED
export const failEnglishVocational3b =
    `
    ${headerTemplate}
    ${failVocational3bTemplate}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate3b}
    ${understanding3BFailResultTemplate}
    ${testExperienceSurveyTemplate3b}
    ${statementOfFailureVocational3bTemplate}
    ${howToAppealTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
    `;

export const passEnglishVocational =
    `
    ${headerTemplate}
    ${passDrivingTemplate}
    ${DrivingFaultsVocationalTemplate}
    ${ecoTemplate}
    ${NextStepsVocationalPassTemplate}
    ${improveYourDrivingVocationalManTemplate}
    ${testExperienceSurveyVocationalTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishVocational =
    `
    ${headerTemplate}
    ${failDrivingTemplate}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${DrivingFaultsVocationalTemplate}
    ${ecoTemplate}
    ${NextStepsVocationalFailTemplate}
    ${StatementOfFailureVocationalTemplate}
    ${testExperienceSurveyVocationalTemplate}
    ${dataPrivacyTemplate}
    `;

export const failEnglishMod1 = `
    ${headerTemplate}
    ${failAMod1Template}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${ridingFaultTemplate}
    ${emergencyStopTemplate}
    ${avoidanceExerciseTemplate}
    ${ecoRidingTemplate}
    ${understandingMod1ResultTemplate}
    ${testExperienceSurveyRidingTemplate}
    ${statementOfFailureMod1Template}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

/**
 * Select subject based upon category & language
 * types: Driving | Riding | ADI3
 * @param category
 * @param language
 * @param padi
 */
export function subjectMapper(category: TestCategory, language: Language, padi?: boolean) {
  const subjectType = padi ? 'padi' : getCategorySubject(category);
  return (emailSubjects as Record<string, string>)[`${subjectType}${language}Subject`] || '';
}

/**
 * Select template based upon category, test outcome & language
 * Note: ADI3/padi follows a different pattern
 * @param testOutcome
 * @param category
 * @param language
 * @param padi
 */
export function templateMapper(testOutcome: TestOutcome, category: TestCategory, language: Language, padi?: boolean) {
  console.log('testOutcome:', testOutcome);
  console.log('category:', category);
  console.log('language:', language);
  const testType = padi ? 'padi' : getCategoryType(category);
  const outcome = isADI3Category(category) ? TestOutcome.OTHER : testOutcome;
  return (templates as Record<string, string>)[`${outcome}${language}${testType}`] || '';
}

const templates = {
  passEnglishAdi2,
  failEnglishAdi2,
  passEnglishAdi3,
  failEnglishAdi3FirstOrSecondAttempt,
  failEnglishAdi3ThirdAttempt,
  passEnglishVocational4,
  failEnglishVocational,
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
