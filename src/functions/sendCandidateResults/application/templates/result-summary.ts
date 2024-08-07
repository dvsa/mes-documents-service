/* eslint-disable max-len */
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import * as Handlebars from 'handlebars';

/**
 * Function to transform the category displayed into a more user-friendly format
 * transformCategory
 * @param category
 */
Handlebars.registerHelper('transformCategory', function (category: TestCategory.EUAM1 | TestCategory.EUAM2) {
  const categoryTransform = {
    EUAM1: 'AM1',
    EUAM2: 'AM2',
  };

  return categoryTransform[category] || category;
});

/**
 * Function to generate a pass result template
 * @param testType
 * @param categorySwitch
 */
export const passResultTemplate = (testType: string, categorySwitch: TestCategory): string => {
  let template: string;
  switch(categorySwitch) {
  case TestCategory.ADI3:
  case TestCategory.SC:
    template = `
^# Result: Pass (grade {{grade}})\n
^Test type: ${testType}\n
^Test centre: {{location}}\n
^Date: {{date}}

## Result summary

^Overall score: {{totalScore}} out of 51

^Lesson planning: {{lessonPlanningScore}} out of 12
^Risk management: {{riskManagementScore}} out of 15
^Teaching and learning strategies: {{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student – {{studentLevel}}
 
^Theme(s): 
{{#each lessonThemes}}
  - {{ this }} 
{{/each}} 

---

Congratulations on passing your ${categorySwitch === TestCategory.SC ? 'ADI standards check' : 'test'}.

To keep improving, it’s important to understand which competencies you can continue to develop. 

---    
    `;
    break;
  case TestCategory.C:
  case TestCategory.C1M:
  case TestCategory.CCPC:
    template = `
^# Result: Pass\n
^Test type: ${testType} (category {{category}})\n
^Test centre: {{location}}\n
^Date: {{date}}
{{#if ${categorySwitch === TestCategory.CCPC}}}
\n^Overall score: {{totalScore}} out of 100
{{/if}}

Congratulations on passing your test.
 
To keep improving, it’s important to understand any faults you made.
      `;
    break;
  default:
    template = `
^# Result: Pass\n
^Test type: ${testType} (category {{transformCategory category}})\n
^Test centre: {{location}}\n
^Date: {{date}}
     
Congratulations on passing your test.
     
To keep improving, it’s important to understand any faults you made.
      `;
  }
  return template;
};

/**
 * Function to generate a fail result template
 * @param testType
 * @param categorySwitch
 * @param thirdAttempt
 */
export const failResultTemplate = (testType: string, categorySwitch: TestCategory, thirdAttempt?: boolean): string => {
  let template: string;
  switch(categorySwitch) {
  case TestCategory.ADI3:
  case TestCategory.SC:
    template = `
^# Result: Unsuccessful\n
^Test type: ${testType}\n
^Test centre: {{location}}\n
^Date: {{date}}

## Result summary

{{#if code4}}
^##Terminated
{{/if}}
{{#if RMFail}}
^##Risk management fail
{{/if}}
 
^Overall score: {{totalScore}} out of 51

^Lesson planning: {{lessonPlanningScore}} out of 12
^Risk management: {{riskManagementScore}} out of 15
^Teaching and learning strategies: {{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student – {{studentLevel}} 
^Theme(s): 
{{#each lessonThemes}}
  - {{ this }} 
{{/each}} 

---

We're sorry that you were unsuccessful this ${thirdAttempt ? 'time and have not qualified as an ADI' : 'time'}.
{{#if ${categorySwitch === TestCategory.SC}}}

You’re allowed 3 attempts to pass the standards check.
{{/if}}

${thirdAttempt ? 'If you intend to restart the qualification process,' : `To prepare for your next ${categorySwitch === TestCategory.SC ? 'standards check' : 'test,'}`} it’s important to understand more about the competencies you were assessed on.

---
    `;
    break;
  case TestCategory.CCPC:
    template = `
^# Result: Unsuccessful
^Test type: Driver CPC part 4 (practical demonstration) test (category {{category}})\n
^Test centre: {{location}}\n
^Date: {{date}}\n
^Overall score: {{totalScore}} out of 100

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about your result this time.
    `;
    break;
  default: template = `
^# Result: Unsuccessful\n
^Test type: ${testType} (category {{transformCategory category}})\n
^Test centre: {{location}}\n
^Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time.
    `;
  }
  return template;
};
