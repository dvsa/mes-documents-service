import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {Language} from '../../domain/conducted-language';
import {headerTemplate, headerWelshTemplate} from '../templates/header';
import {
  failResultTemplate,
  failResultWelshTemplate,
  passResultTemplate,
  passResultWelshTemplate,
} from '../templates/result-summary';
import {
  testExperienceSurveyRidingTemplate,
  testExperienceSurveyRidingWelshTemplate,
  testExperienceSurveyTemplate,
  testExperienceSurveyTemplate3b,
  testExperienceSurveyWelshTemplate, testExperienceSurveyWelshTemplate3b,
} from '../templates/test-experience-survey';
import {dataPrivacyTemplate, dataPrivacyWelshTemplate} from '../templates/data-privacy';
import {TestOutcome} from '../../domain/test-outcome';
import {etaTemplate, etaWelshTemplate} from '../templates/eta';
import {dangerousFaultsTemplate, dangerousFaultsWelshTemplate} from '../templates/dangerous-faults';
import {seriousFaultsTemplate, seriousFaultsWelshTemplate} from '../templates/serious-faults';
import {
  drivingFaultsTemplate,
  drivingFaultsWelshTemplate,
  ridingFaultTemplate,
  ridingFaultWelshTemplate,
  vocationalScoring,
  vocationalScoringExplanation, vocationalScoringExplanationWelsh, vocationalScoringWelsh,
} from '../templates/driving-faults';
import {
  nextStepsADI2FailTemplate,
  nextStepsAdi2PassTemplate,
  nextStepsAdi2WelshFailTemplate,
  nextStepsAdi2WelshPassTemplate,
  nextStepsAdi3FirstOrSecondFailTemplate,
  nextStepsAdi3FirstOrSecondWelshFailTemplate,
  nextStepsAdi3PassTemplate,
  nextStepsAdi3ThirdFailTemplate,
  nextStepsAdi3ThirdWelshFailTemplate,
  nextStepsAdi3WelshPassTemplate,
  nextStepsDrivingTemplate,
  nextStepsDrivingWelshTemplate,
  nextStepsFailBTemplate,
  nextStepsFailBWelshTemplate,
  nextStepsMod1PassTemplate,
  nextStepsMod1PassWelshTemplate,
  NextStepsPass3aTemplate, nextStepsPass3aWelshTemplate,
  nextStepsScFirstOrSecondTemplate,
  nextStepsScFirstOrSecondWelshTemplate,
  nextStepsScThirdTemplate,
  nextStepsScThirdWelshTemplate,
} from '../templates/next-steps';
import {getCategorySubject, getCategoryType, isADI3Category} from './category-provider';
import {
  adi2EnglishSubject,
  adi2WelshSubject,
  adi3EnglishSubject,
  adi3WelshSubject,
  scEnglishSubject,
  scWelshSubject,
  drivingEnglishSubject,
  drivingWelshSubject,
  mod1EnglishSubject,
  mod1WelshSubject,
  mod2EnglishSubject,
  mod2WelshSubject,
  homeEnglishSubject,
  homeWelshSubject,
  manoeuvreEnglishSubject,
  manoeuvreWelshSubject,
  vocationalEnglishSubject,
  vocationalWelshSubject,
  cpcEnglishSubject,
  cpcWelshSubject,
} from '../templates/email-subject';
import {emergencyStopTemplate, emergencyStopWelshTemplate} from '../templates/emergency-stop';
import {avoidanceExerciseTemplate, avoidanceExerciseWelshTemplate} from '../templates/avoidance-exercise';
import {gradeTemplate, gradeWelshTemplate} from '../templates/grade';
import {
  statementOfFailureBTemplate,
  statementOfFailureBWelshTemplate,
  statementOfFailureMod1Template,
  statementOfFailureMod1WelshTemplate,
  statementOfFailureMod2Template,
  statementOfFailureMod2WelshTemplate,
  statementOfFailureTractorTemplate,
  statementOfFailureTractorWelshTemplate,
  statementOfFailure3a_3bTemplate,
  statementOfFailure3a_3bWelshTemplate, statementOfFailureVocational4, statementOfFailureVocational4Welsh,
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
  importantInformationForHGVAndBusVocational3bWelshTemplate,
  importantInformationForHGVAndBusVocational4Template,
  importantInformationForHGVAndBusVocational4WelshTemplate,
  vocationalIfYouWantToDriveTemplate3b,
  vocationalIfYouWantToDriveTemplate4,
  vocationalIfYouWantToDriveWelshTemplate3b,
  vocationalIfYouWantToDriveWelshTemplate4,
} from '../templates/vocational-additional-info';
import {
  importantInfoForDriversB,
  importantInfoForDriversBWelsh,
  importantInfoForDriversSc,
  importantInfoForDriversScWelsh,
  importantInfoForDriversTractor,
  importantInfoForDriversTractorWelsh,
  importantInfoForNewDriversAdi3,
  importantInfoForNewDriversAdi3Welsh,
  importantInfoForRiders, importantInfoForRidersWelsh,
} from '../templates/info-for-new-drivers';
import {ecoTemplate, ecoWelshTemplate} from '../templates/eco';
import {writeFileSync} from 'node:fs';

// ADI2
export const passEnglishAdi2 = `
    ${headerTemplate}
    ${passResultTemplate('ADI part 2 (driving ability) test', TestCategory.ADI2)}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.ADI2, PassUrls.ADI2)}
    ${nextStepsAdi2PassTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

// ADI2
export const passWelshAdi2 = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('Prawf ADI rhan 2 (gallu gyrru)', TestCategory.ADI2)}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.ADI2, PassUrls.ADI2)}
    ${nextStepsAdi2WelshPassTemplate}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

export const failEnglishAdi2 = `
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

export const failWelshAdi2 = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('Prawf ADI rhan 2 (gallu gyrru)', TestCategory.ADI2)}
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

export const passWelshAdi3 = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('', TestCategory.ADI3)}
    ${gradeWelshTemplate}
    ${nextStepsAdi3WelshPassTemplate}
    ${importantInfoForNewDriversAdi3Welsh}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshAdi3FirstOrSecondAttempt = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('prawf ADI rhan 3 (gallu cyfarwyddiadol)', TestCategory.ADI3)}
    ${gradeWelshTemplate}
    ${nextStepsAdi3FirstOrSecondWelshFailTemplate}
    ${howToAppealWelshTemplate(AppealUrls.ADI3_1ST_OR_2ND, TestCategory.ADI3)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshAdi3ThirdAttempt = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('prawf ADI rhan 3 (gallu cyfarwyddiadol)', TestCategory.ADI3)}
    ${gradeWelshTemplate}
    ${nextStepsAdi3ThirdWelshFailTemplate}
    ${howToAppealWelshTemplate(AppealUrls.ADI3_3RD, TestCategory.ADI3)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const passWelshSc = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('arolwg safonau ADI', TestCategory.SC)}
    ${gradeWelshTemplate}
    ${importantInfoForDriversScWelsh}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshScFirstOrSecondAttempt = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('arolwg safonau ADI', TestCategory.SC)}
    ${gradeWelshTemplate}
    ${nextStepsScFirstOrSecondWelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.SC_1ST_OR_2ND, TestCategory.SC)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshScThirdAttempt = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('arolwg safonau ADI', TestCategory.SC, true)}
    ${gradeWelshTemplate}
    ${nextStepsScThirdWelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.SC_3RD, TestCategory.SC)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const passWelshB = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('prawf gyrru car', TestCategory.B)}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, PassUrls.B)}
    ${nextStepsDrivingWelshTemplate}
    ${testExperienceSurveyWelshTemplate}
    ${importantInfoForDriversBWelsh}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshB = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('prawf gyrru car', TestCategory.B)}
    ${etaWelshTemplate}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, FailUrls.B, true)}
    ${nextStepsFailBWelshTemplate}
    ${testExperienceSurveyWelshTemplate}
    ${statementOfFailureBWelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.B, TestCategory.B)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const passWelshAMod1 = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('prawf gyrru beic modur modiwl 1 (oddi ar y ffordd)', TestCategory.EUAM1)}
    ${ridingFaultWelshTemplate}
    ${emergencyStopWelshTemplate}
    ${avoidanceExerciseWelshTemplate}
    ${ecoWelshTemplate(true)}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.RIDING, PassUrls.MOD1)}
    ${nextStepsMod1PassWelshTemplate}
    ${testExperienceSurveyRidingWelshTemplate}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshAMod1 = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('prawf gyrru beic modur modiwl 1 (oddi ar y ffordd)', TestCategory.EUAM1)}
    ${etaWelshTemplate}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${ridingFaultWelshTemplate}
    ${emergencyStopWelshTemplate}
    ${avoidanceExerciseWelshTemplate}
    ${ecoWelshTemplate(true)}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.RIDING, FailUrls.MOD1, true)}
    ${testExperienceSurveyRidingWelshTemplate}
    ${statementOfFailureMod1WelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.MOD1, TestCategory.EUAM1, true)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

// MOD2
export const passEnglishAMod2 = `
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

export const passWelshAMod2 = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('prawf gyrru beic modur modiwl 2 (oddi ar y ffordd)', TestCategory.EUAM2)}
    ${ridingFaultWelshTemplate}
    ${ecoWelshTemplate(true)}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.RIDING, PassUrls.MOD2)}
    ${nextStepsDrivingWelshTemplate}
    ${testExperienceSurveyRidingWelshTemplate}
    ${importantInfoForRidersWelsh}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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

export const failWelshAMod2 = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('prawf gyrru beic modur modiwl 2 (oddi ar y ffordd)', TestCategory.EUAM2)}
    ${etaWelshTemplate}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${ridingFaultWelshTemplate}
    ${ecoWelshTemplate(true)}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.RIDING, FailUrls.MOD2, true)}
    ${testExperienceSurveyRidingWelshTemplate}
    ${statementOfFailureMod2WelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.MOD2, TestCategory.EUAM2, true)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

// Tractor
export const passEnglishHome = `
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

export const passWelshHome = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('prawf gyrru tractor neu gerbyd arbenigol', TestCategory.F)}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, PassUrls.TRACTOR)}
    ${nextStepsDrivingWelshTemplate}
    ${importantInfoForDriversTractorWelsh}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

export const failEnglishHome = `
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

export const failWelshHome = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('prawf gyrru tractor neu gerbyd arbenigol', TestCategory.F)}
    ${etaWelshTemplate}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, FailUrls.TRACTOR, true)}
    ${statementOfFailureTractorWelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.TRACTOR, TestCategory.F)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

// Manoeuvres
export const passEnglishMan = `
    ${headerTemplate}
    ${passResultTemplate('Driver CPC part 3a (off-road exercises) test', TestCategory.C1M)}
    ${NextStepsPass3aTemplate}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const passWelshMan = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('prawf gyrru tractor neu gerbyd arbenigol', TestCategory.C1M)}
    ${nextStepsPass3aWelshTemplate}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

export const failEnglishMan = `
    ${headerTemplate}
    ${failResultTemplate('Driver CPC part 3a (off-road exercises) test', TestCategory.C1M)}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, FailUrls.MANOEUVRES, true)}
    ${statementOfFailure3a_3bTemplate}
    ${howToAppealTemplate(AppealUrls.MANOEUVRES, TestCategory.C1M)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failWelshMan = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('Prawf gyrrwr CPC rhan 3a (ymarferion oddi ar y ffordd)', TestCategory.C1M)}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, FailUrls.MANOEUVRES, true)}
    ${statementOfFailure3a_3bWelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.MANOEUVRES, TestCategory.C1M)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

// Vocational
export const passEnglishVocational = `
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

export const passWelshVocational = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('Prawf gyrrwr CPC rhan 3b (ymarferion oddi ar y ffordd)', TestCategory.C)}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, PassUrls.VOCATIONAL)}
    ${nextStepsDrivingWelshTemplate}
    ${testExperienceSurveyWelshTemplate3b}
    ${vocationalIfYouWantToDriveWelshTemplate3b}
    ${importantInformationForHGVAndBusVocational3bWelshTemplate}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

export const failEnglishVocational = `
    ${headerTemplate}
    ${failResultTemplate('Driver CPC part 3b (on-road driving) test', TestCategory.C)}
    ${etaTemplate}
    ${dangerousFaultsTemplate}
    ${seriousFaultsTemplate}
    ${drivingFaultsTemplate}
    ${ecoTemplate()}
    ${understandingResultTemplate(UrlDescriptors.DRIVING, FailUrls.VOCATIONAL, true)}
    ${testExperienceSurveyTemplate3b}
    ${statementOfFailure3a_3bTemplate}
    ${howToAppealTemplate(AppealUrls.VOCATIONAL, TestCategory.C)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failWelshVocational = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('Prawf gyrrwr CPC rhan 3b (ymarferion oddi ar y ffordd)', TestCategory.C)}
    ${etaWelshTemplate}
    ${dangerousFaultsWelshTemplate}
    ${seriousFaultsWelshTemplate}
    ${drivingFaultsWelshTemplate}
    ${ecoWelshTemplate()}
    ${understandingResultWelshTemplate(UrlDescriptorsWelsh.DRIVING, FailUrls.VOCATIONAL, true)}
    ${testExperienceSurveyWelshTemplate3b}
    ${statementOfFailure3a_3bWelshTemplate}
    ${howToAppealWelshTemplate(AppealUrls.VOCATIONAL, TestCategory.C)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

// CPC
export const passEnglishCpc = `
    ${headerTemplate}
    ${passResultTemplate('Driver CPC part 4 (practical demonstration) test', TestCategory.CCPC)}
    ${vocationalScoringExplanation}
    ${vocationalScoring}
    ${vocationalIfYouWantToDriveTemplate4}
    ${importantInformationForHGVAndBusVocational4Template}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const passWelshCpc = `
    ${headerWelshTemplate}
    ${passResultWelshTemplate('Prawf gyrrwr CPC rhan 4 (arddangosiad ymarferol)', TestCategory.CCPC)}
    ${vocationalScoringExplanationWelsh}
    ${vocationalScoringWelsh}
    ${vocationalIfYouWantToDriveWelshTemplate4}
    ${importantInformationForHGVAndBusVocational4WelshTemplate}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
`;

export const failEnglishCpc = `
    ${headerTemplate}
    ${failResultTemplate('Driver CPC part 4 (practical demonstration) test', TestCategory.CCPC)}
    ${vocationalScoringExplanation}
    ${vocationalScoring}
    ${statementOfFailureVocational4}
    ${howToAppealTemplate(AppealUrls.CPC, TestCategory.CCPC)}
    ${signOffTemplate}
    ${dataPrivacyTemplate}
`;

export const failWelshCpc = `
    ${headerWelshTemplate}
    ${failResultWelshTemplate('Prawf gyrrwr CPC rhan 4 (arddangosiad ymarferol)', TestCategory.CCPC)}
    ${vocationalScoringExplanationWelsh}
    ${vocationalScoringWelsh}
    ${statementOfFailureVocational4Welsh}
    ${howToAppealWelshTemplate(AppealUrls.CPC, TestCategory.CCPC)}
    ${signOffWelshTemplate}
    ${dataPrivacyWelshTemplate}
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
  passWelshAdi2,
  failEnglishAdi2,
  failWelshAdi2,
  passEnglishAdi3,
  passWelshAdi3,
  failEnglishAdi3FirstOrSecondAttempt,
  failWelshAdi3FirstOrSecondAttempt,
  failEnglishAdi3ThirdAttempt,
  failWelshAdi3ThirdAttempt,
  passEnglishSc,
  passWelshSc,
  failEnglishScFirstOrSecondAttempt,
  failWelshScFirstOrSecondAttempt,
  failEnglishScThirdAttempt,
  failWelshScThirdAttempt,
  passEnglishB,
  passWelshB,
  failEnglishB,
  failWelshB,
  passEnglishAMod1,
  passWelshAMod1,
  failEnglishAMod1,
  failWelshAMod1,
  passEnglishAMod2,
  passWelshAMod2,
  failEnglishAMod2,
  failWelshAMod2,
  passEnglishHome,
  passWelshHome,
  failEnglishHome,
  failWelshHome,
  passEnglishMan,
  passWelshMan,
  failEnglishMan,
  failWelshMan,
  passEnglishVocational,
  passWelshVocational,
  failEnglishVocational,
  failWelshVocational,
  passEnglishCpc,
  passWelshCpc,
  failEnglishCpc,
  failWelshCpc,
};

const emailSubjects = {
  adi2EnglishSubject,
  adi2WelshSubject,
  adi3EnglishSubject,
  adi3WelshSubject,
  scEnglishSubject,
  scWelshSubject,
  drivingEnglishSubject,
  drivingWelshSubject,
  mod1EnglishSubject,
  mod1WelshSubject,
  mod2EnglishSubject,
  mod2WelshSubject,
  homeEnglishSubject,
  homeWelshSubject,
  manoeuvreEnglishSubject,
  manoeuvreWelshSubject,
  vocationalEnglishSubject,
  vocationalWelshSubject,
  cpcEnglishSubject,
  cpcWelshSubject,
};
