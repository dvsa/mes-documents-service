import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { ConductedLanguage } from '../../domain/conducted-language';
import {
  headerADITemplate,
  headerRidingTemplate,
  headerRidingWelshTemplate,
  headerTemplate,
  headerWelshTemplate,
} from '../templates/common/header';
import {
  adi3ResultsTemplate,
  adi3Template,
  failDrivingTemplate,
  failDrivingWelshTemplate,
  failRidingTemplate,
  failRidingWelshTemplate,
  passDrivingTemplate,
  passDrivingWelshTemplate,
  passRidingTemplate,
  passRidingWelshTemplate,
} from '../templates/common/result-summary';
import {
  improveYourDrivingTemplate,
  improveYourDrivingVocationalTemplate,
  improveYourDrivingVocationalWelshTemplate,
  improveYourDrivingWelshTemplate,
  improveYourRidingTemplate,
  improveYourRidingWelshTemplate,
} from '../templates/common/improve-your-driving';
import {
  testExperienceRidingSurveyTemplate,
  testExperienceSurveyTemplate,
  testExperienceSurveyVocationalTemplate,
  testExperienceSurveyWelshTemplate,
} from '../templates/common/test-experience-survey';
import { firstCarTemplate, firstCarWelshTemplate } from '../templates/common/firstCar';
import { dataPrivacyTemplate, dataPrivacyWelshTemplate } from '../templates/common/data-privacy';
import { TestOutcome } from '../../domain/test-outcome';
import { etaTemplate, etaTemplateWelsh } from '../templates/common/eta';
import { DangerousFaultsTemplate, DangerousFaultsWelshTemplate } from '../templates/common/dangerous-faults';
import { SeriousFaultsTemplate, SeriousFaultsWelshTemplate } from '../templates/common/serious-faults';
import {
  DrivingFaultsADI2Template, DrivingFaultsADI2WelshTemplate,
  DrivingFaultsTemplate, DrivingFaultsVocationalTemplate, DrivingFaultsVocationalWelshTemplate,
  DrivingFaultsWelshTemplate,
  RidingFaultsTemplate,
  RidingFaultsWelshTemplate,
} from '../templates/common/driving-faults';
import { EcoRidingTemplate, EcoRidingWelshTemplate, EcoTemplate, EcoWelshTemplate } from '../templates/common/eco';
import {
  NextStepsADI2FailTemplate,
  NextStepsADI2FailWelshTemplate,
  NextStepsADI2PassTemplate,
  NextStepsADI2PassWelshTemplate,
  NextStepsFailRidingMod1WelshTemplate,
  NextStepsFailRidingMod2WelshTemplate,
  NextStepsFailTemplate,
  NextStepsFailWelshTemplate,
  NextStepsPassTemplate,
  NextStepsPassWelshTemplate,
  NextStepsRidingMod1FailTemplate,
  NextStepsRidingMod1PassTemplate,
  NextStepsRidingMod1PassWelshTemplate,
  NextStepsRidingMod2FailTemplate,
  NextStepsRidingMod2PassTemplate,
  NextStepsRidingMod2PassWelshTemplate, NextStepsVocationalFailTemplate, NextStepsVocationalFailWelshTemplate,
  NextStepsVocationalPassTemplate,
  NextStepsVocationalPassWelshTemplate,
} from '../templates/common/next-steps';
import { getCategorySubject, getCategoryType, isADI3Category } from './category-provider';
import {
  adiEnglishSubject, adiWelshSubject,
  drivingEnglishSubject,
  drivingWelshSubject,
  ridingEnglishSubject,
  ridingWelshSubject,
} from '../templates/common/email-subject';
import {
  EmergencyStopTemplate,
  EmergencyStopTemplateWelshTemplate,
} from '../templates/common/emergency-stop';
import { AvoidanceExerciseTemplate, AvoidanceExerciseWelshTemplate } from '../templates/common/avoidance-exercise';
import { gradeTemplate } from '../templates/common/grade';
import { scoreTemplate } from '../templates/common/score';
import { themeTemplate } from '../templates/common/theme';
import { feedbackTemplate } from '../templates/common/feedback';

export const passEnglishAMod1 =
  `
    ${headerRidingTemplate}
    ${passRidingTemplate}
    ${RidingFaultsTemplate}
    ${EmergencyStopTemplate}
    ${AvoidanceExerciseTemplate}
    ${EcoRidingTemplate}
    ${NextStepsRidingMod1PassTemplate}
    ${testExperienceRidingSurveyTemplate}
    ${dataPrivacyTemplate}
    `;

export const passWelshAMod1 =
  `
    ${headerRidingWelshTemplate}
    ${passRidingWelshTemplate}
    ${RidingFaultsWelshTemplate}    
    ${EmergencyStopTemplateWelshTemplate}    
    ${AvoidanceExerciseWelshTemplate}    
    ${EcoRidingWelshTemplate}    
    ${NextStepsRidingMod1PassWelshTemplate}    
    ${dataPrivacyWelshTemplate}
    `;

export const failEnglishAMod1 =
  `
    ${headerRidingTemplate}
    ${failRidingTemplate}
    ${etaTemplate}
    ${DangerousFaultsTemplate}
    ${SeriousFaultsTemplate}
    ${RidingFaultsTemplate}
    ${EmergencyStopTemplate}
    ${AvoidanceExerciseTemplate}
    ${EcoRidingTemplate}
    ${NextStepsRidingMod1FailTemplate}
    ${testExperienceSurveyTemplate}
    ${dataPrivacyTemplate}
    `;

export const failWelshAMod1 =
  `
    ${headerRidingWelshTemplate}
    ${failRidingWelshTemplate}
    ${etaTemplateWelsh}
    ${DangerousFaultsWelshTemplate}
    ${SeriousFaultsWelshTemplate}
    ${RidingFaultsWelshTemplate}   
    ${EmergencyStopTemplateWelshTemplate}    
    ${AvoidanceExerciseWelshTemplate}   
    ${EcoRidingWelshTemplate} 
    ${NextStepsFailRidingMod1WelshTemplate} 
    ${dataPrivacyWelshTemplate}
    `;

export const passEnglishAMod2 =
  `
    ${headerRidingTemplate}
    ${passRidingTemplate}
    ${RidingFaultsTemplate}
    ${EcoRidingTemplate}
    ${NextStepsRidingMod2PassTemplate}
    ${improveYourRidingTemplate}
    ${testExperienceRidingSurveyTemplate}
    ${dataPrivacyTemplate}
    `;

export const passWelshAMod2 =
  `
    ${headerRidingWelshTemplate}
    ${passRidingWelshTemplate}
    ${RidingFaultsWelshTemplate}    
    ${EcoRidingWelshTemplate}    
    ${NextStepsRidingMod2PassWelshTemplate}    
    ${improveYourRidingWelshTemplate}    
    ${dataPrivacyWelshTemplate}
    `;

export const failEnglishAMod2 =
  `
    ${headerRidingTemplate}
    ${failRidingTemplate}
    ${etaTemplate}
    ${DangerousFaultsTemplate}
    ${SeriousFaultsTemplate}
    ${RidingFaultsTemplate}
    ${EcoRidingTemplate}
    ${NextStepsRidingMod2FailTemplate}
    ${testExperienceSurveyTemplate}
    ${dataPrivacyTemplate}
    `;

export const failWelshAMod2 =
  `
    ${headerRidingWelshTemplate}
    ${failRidingWelshTemplate}
    ${etaTemplateWelsh}
    ${DangerousFaultsWelshTemplate}
    ${SeriousFaultsWelshTemplate}
    ${RidingFaultsWelshTemplate}   
    ${EcoRidingWelshTemplate} 
    ${NextStepsFailRidingMod2WelshTemplate} 
    ${dataPrivacyWelshTemplate}
    `;

export const passEnglishADI2 =
  `
    ${headerTemplate}
    ${passDrivingTemplate}
    ${DrivingFaultsADI2Template}
    ${EcoTemplate}
    ${NextStepsADI2PassTemplate}
    ${dataPrivacyTemplate}
    `;

export const passWelshADI2 =
  `
    ${headerWelshTemplate}
    ${passDrivingWelshTemplate}
    ${DrivingFaultsADI2WelshTemplate}    
    ${EcoWelshTemplate}    
    ${NextStepsADI2PassWelshTemplate}    
    ${dataPrivacyWelshTemplate}
    `;

export const failEnglishADI2 =
  `
    ${headerTemplate}
    ${failDrivingTemplate}
    ${etaTemplate}
    ${DangerousFaultsTemplate}
    ${SeriousFaultsTemplate}
    ${DrivingFaultsADI2Template}
    ${EcoTemplate}
    ${NextStepsADI2FailTemplate}
    ${dataPrivacyTemplate}
    `;

export const failWelshADI2 =
  `
    ${headerWelshTemplate}
    ${failDrivingWelshTemplate}
    ${etaTemplateWelsh}
    ${DangerousFaultsWelshTemplate}
    ${SeriousFaultsWelshTemplate}
    ${DrivingFaultsADI2WelshTemplate}
    ${EcoWelshTemplate} 
    ${NextStepsADI2FailWelshTemplate} 
    ${dataPrivacyWelshTemplate}
    `;

export const otherEnglishADI3 =
  `
    ${headerADITemplate}
    ${adi3Template}
    ${gradeTemplate}
    ${scoreTemplate}
    ${themeTemplate}
    ${feedbackTemplate}
    ${adi3ResultsTemplate}
    ${dataPrivacyTemplate}
    `;

export const otherWelshADI3 =
  `
    ${otherEnglishADI3}
    `;

export const passEnglishB =
  `
    ${headerTemplate}
    ${passDrivingTemplate}
    ${DrivingFaultsTemplate}
    ${EcoTemplate}
    ${NextStepsPassTemplate}
    ${improveYourDrivingTemplate}
    ${testExperienceSurveyTemplate}
    ${firstCarTemplate}
    ${dataPrivacyTemplate}
    `;

export const passWelshB =
  `
    ${headerWelshTemplate}
    ${passDrivingWelshTemplate}
    ${DrivingFaultsWelshTemplate}    
    ${EcoWelshTemplate}    
    ${NextStepsPassWelshTemplate}    
    ${improveYourDrivingWelshTemplate}
    ${testExperienceSurveyWelshTemplate}
    ${firstCarWelshTemplate}
    ${dataPrivacyWelshTemplate}
    `;

export const failEnglishB =
  `
    ${headerTemplate}
    ${failDrivingTemplate}
    ${etaTemplate}
    ${DangerousFaultsTemplate}
    ${SeriousFaultsTemplate}
    ${DrivingFaultsTemplate}
    ${EcoTemplate}
    ${NextStepsFailTemplate}
    ${testExperienceSurveyTemplate}
    ${firstCarTemplate}
    ${dataPrivacyTemplate}
    `;

export const failWelshB =
  `
    ${headerWelshTemplate}
    ${failDrivingWelshTemplate}
    ${etaTemplateWelsh}
    ${DangerousFaultsWelshTemplate}
    ${SeriousFaultsWelshTemplate}
    ${DrivingFaultsWelshTemplate}
    ${EcoWelshTemplate} 
    ${NextStepsFailWelshTemplate} 
    ${testExperienceSurveyWelshTemplate}
    ${firstCarWelshTemplate}    
    ${dataPrivacyWelshTemplate}
    `;

export const passEnglishVocational =
  `
    ${headerTemplate}
    ${passDrivingTemplate}
    ${DrivingFaultsTemplate}
    ${EcoTemplate}
    ${NextStepsVocationalPassTemplate}
    ${improveYourDrivingVocationalTemplate}
    ${testExperienceSurveyVocationalTemplate}
    ${dataPrivacyTemplate}
    `;

export const passWelshVocational =
  `
    ${headerWelshTemplate}
    ${passDrivingWelshTemplate}
    ${DrivingFaultsWelshTemplate}    
    ${EcoWelshTemplate}    
    ${NextStepsVocationalPassWelshTemplate}    
    ${improveYourDrivingVocationalWelshTemplate}
    ${dataPrivacyWelshTemplate}
    `;

export const failEnglishVocational =
  `
    ${headerTemplate}
    ${failDrivingTemplate}
    ${etaTemplate}
    ${DangerousFaultsTemplate}
    ${SeriousFaultsTemplate}
    ${DrivingFaultsVocationalTemplate}
    ${EcoTemplate}
    ${NextStepsVocationalFailTemplate}
    ${testExperienceSurveyVocationalTemplate}
    ${dataPrivacyTemplate}
    `;

export const failWelshVocational =
  `
    ${headerWelshTemplate}
    ${failDrivingWelshTemplate}
    ${etaTemplateWelsh}
    ${DangerousFaultsWelshTemplate}
    ${SeriousFaultsWelshTemplate}
    ${DrivingFaultsVocationalWelshTemplate}
    ${EcoWelshTemplate} 
    ${NextStepsVocationalFailWelshTemplate} 
    ${dataPrivacyWelshTemplate}
    `;

/**
 * Select subject based upon category & language
 * types: Driving | Riding | ADI3
 * @param category
 * @param language
 */
export function subjectMapper(category: TestCategory, language: ConductedLanguage) {
  const vehicleType = getCategorySubject(category);
  return (emailSubjects as Record<string, string>)[`${vehicleType}${language}Subject`] || '';
}

/**
 * Select template based upon category, test outcome & language
 * Note: ADI3 follows a different pattern
 * @param testOutcome
 * @param category
 * @param language
 */
export function templateMapper(testOutcome: TestOutcome, category: TestCategory, language: ConductedLanguage) {
  const testType = getCategoryType(category);
  const outcome = isADI3Category(category) ? TestOutcome.OTHER : testOutcome;
  return (templates as Record<string, string>)[`${outcome}${language}${testType}`] || '';
}

const templates = {
  passEnglishAMod1,
  passWelshAMod1,
  failEnglishAMod1,
  failWelshAMod1,
  passEnglishAMod2,
  passWelshAMod2,
  failEnglishAMod2,
  failWelshAMod2,
  passEnglishADI2,
  passWelshADI2,
  failEnglishADI2,
  failWelshADI2,
  otherEnglishADI3,
  otherWelshADI3,
  passEnglishB,
  passWelshB,
  failEnglishB,
  failWelshB,
  passEnglishVocational,
  passWelshVocational,
  failEnglishVocational,
  failWelshVocational,
};

const emailSubjects = {
  drivingEnglishSubject,
  drivingWelshSubject,
  ridingEnglishSubject,
  ridingWelshSubject,
  adiEnglishSubject,
  adiWelshSubject,
};
