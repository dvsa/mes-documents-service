/* eslint-disable max-len */
import {Correspondence} from '../../domain/template-id.model';
import * as Handlebars from 'handlebars';

/**
 * Handlebars helper to correctly display the URL depending on if it's an E-mail or Letter
 */
Handlebars.registerHelper('displayUrlTestExperience', function (communicationMethod: string, urlDescriptor: string, url: string) {
  if (communicationMethod === Correspondence.EMAIL) {
    return `^[${urlDescriptor}](${url}).`;
  } else return `^${urlDescriptor}: ${url}`;
});

export const testExperienceSurveyTemplate = `
# Tell us what you think

Every customer is important to us. We’d like your feedback about taking this test. We’ll use it to keep improving our services. 

{{displayUrlTestExperience communicationMethod "Start the survey now - it takes about 5 minutes" "https://survey.dvsa.gov.uk/jfe/form/SV_0NF3OJBlhZa5GpU"}}

---

`;

export const testExperienceSurveyWelshTemplate = `
# Gad i ni wybod beth yr ydych yn credu

Mae pob cwsmer yn bwysig i ni. Fyddwn yn hoffi clywed eich adborth am cymryd y prawf hwn. Mi fyddwn yn ei defnyddio ar gyfer wella ein gwasanaethau. 

{{displayUrlTestExperience communicationMethod "Dechreuwch yr arolwg nawr - mae'n cymryd tua 5 munud" "https://survey.dvsa.gov.uk/jfe/form/SV_0NF3OJBlhZa5GpU"}}
 
---

`;

export const testExperienceSurveyRidingTemplate = `
# Tell us what you think

Every customer is important to us. We’d like your feedback about taking this test. We’ll use it to keep improving our services. 

{{displayUrlTestExperience communicationMethod "Start the survey now - it takes about 5 minutes" "https://survey.dvsa.gov.uk/jfe/form/SV_7UQu2j5BKTqaWhg"}}

---

`;

export const testExperienceSurveyRidingWelshTemplate = `
# Gad i ni wybod beth yr ydych yn credu

Mae pob cwsmer yn bwysig i ni. Fyddwn yn hoffi clywed eich adborth am cymryd y prawf hwn. Mi fyddwn yn ei defnyddio ar gyfer wella ein gwasanaethau. 

{{displayUrlTestExperience communicationMethod "Dechreuwch yr arolwg nawr - mae'n cymryd tua 5 munud" "https://survey.dvsa.gov.uk/jfe/form/SV_7UQu2j5BKTqaWhg"}}

---

`;

export const testExperienceSurveyTemplate3b = `
# Tell us what you think

Every customer is important to us. We’d like your feedback about taking this test. We’ll use it to keep improving our services. 

{{displayUrlTestExperience communicationMethod "Start the survey now - it takes about 5 minutes" "https://survey.dvsa.gov.uk/jfe/form/SV_0oFNA5Vqw2DSm2O"}}

---

`;

export const testExperienceSurveyWelshTemplate3b = `
# Gad i ni wybod beth yr ydych yn credu

Mae pob cwsmer yn bwysig i ni. Fyddwn yn hoffi clywed eich adborth am cymryd y prawf hwn. Mi fyddwn yn ei defnyddio ar gyfer wella ein gwasanaethau. 

{{displayUrlTestExperience communicationMethod "Dechreuwch yr arolwg nawr - mae'n cymryd tua 5 munud" "https://survey.dvsa.gov.uk/jfe/form/SV_0oFNA5Vqw2DSm2O"}}

---

`;
