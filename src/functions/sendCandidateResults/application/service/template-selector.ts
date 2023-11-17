import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { ConductedLanguage } from '../../domain/conducted-language';
import { headerTemplate, headerWelshTemplate } from '../templates/common/header';
import {
  passDrivingTemplate, passDrivingWelshTemplate,
} from '../templates/common/pass-driving-summary';
import { improveYourDrivingTemplate, improveYourDrivingWelshTemplate } from '../templates/common/improve-your-driving';
import {
  testExperienceSurveyTemplate, testExperienceSurveyWelshTemplate,
} from '../templates/common/test-experience-survey';
import { firstCarTemplate, firstCarWelshTemplate } from '../templates/common/firstCar';
import { dataPrivacyTemplate, dataPrivacyWelshTemplate } from '../templates/common/data-privacy';
import { TestOutcome } from '../../domain/test-outcome';
import { etaTemplate, etaTemplateWelsh } from '../templates/common/eta';
import {
  failDrivingTemplate, failDrivingWelshTemplate,
} from '../templates/common/fail-driving-summary';
import { DangerousFaultsTemplate, DangerousFaultsWelshTemplate } from '../templates/common/dangerous-faults';
import { SeriousFaultsTemplate, SeriousFaultsWelshTemplate } from '../templates/common/serious-faults';
import { DrivingFaultsTemplate, DrivingFaultsWelshTemplate } from '../templates/common/driving-faults';
import { EcoTemplate, EcoWelshTemplate } from '../templates/common/eco';
import {
  NextStepsFailTemplate, NextStepsFailWelshTemplate,
  NextStepsPassTemplate,
  NextStepsPassWelshTemplate,
} from '../templates/common/next-steps';

export const passEnglishCatB =
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

export const passWelshCatB =
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

export const failEnglishCatB =
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

export const failWelshCatB =
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

export function templateMapper(testOutcome: TestOutcome, category: TestCategory, language: ConductedLanguage) {
  return (templates as Record<string, string>)[`${testOutcome}${language}Cat${category}`] || '';
}

const templates = {
  passEnglishCatB,
  passWelshCatB,
  failEnglishCatB,
  failWelshCatB,
};
