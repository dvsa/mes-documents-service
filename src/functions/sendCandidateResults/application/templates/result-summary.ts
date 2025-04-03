/* eslint-disable max-len */
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import * as Handlebars from 'handlebars';

export enum CategoryDescriptors {
  B_ENGLISH = 'car driving test',
  B_WELSH = 'prawf gyrru car',
  ADI2_ENGLISH = 'ADI part 2 (driving ability) test',
  ADI2_WELSH = 'Prawf ADI rhan 2 (gallu gyrru)',
  ADI3_ENGLISH = 'ADI part 3 (instructional ability) test',
  ADI3_WELSH = 'prawf ADI rhan 3 (gallu cyfarwyddiadol)',
  SC_ENGLISH = 'ADI standards check',
  SC_WELSH = 'arolwg safonau ADI',
  MOD1_ENGLISH = 'motorcycle module 1 (off-road) test',
  MOD1_WELSH = 'prawf gyrru beic modur modiwl 1 (oddi ar y ffordd)',
  MOD2_ENGLISH = 'motorcycle module 2 (on-road) test',
  MOD2_WELSH = 'prawf gyrru beic modur modiwl 2 (oddi ar y ffordd)',
  HOME_ENGLISH = 'tractor or specialist vehicle driving test',
  HOME_WELSH = 'prawf gyrru tractor neu gerbyd arbenigol',
  MANOEUVRES_ENGLISH = 'Driver CPC part 3a (off-road exercises) test',
  MANOEUVRES_WELSH = 'Prawf gyrrwr CPC rhan 3a (ymarferion oddi ar y ffordd)',
  VOCATIONAL_ENGLISH = 'Driver CPC part 3b (on-road driving) test',
  VOCATIONAL_WELSH = 'Prawf gyrrwr CPC rhan 3b (ymarferion oddi ar y ffordd)',
  CPC_ENGLISH = 'Driver CPC part 4 (practical demonstration) test',
  CPC_WELSH = 'Prawf gyrrwr CPC rhan 4 (arddangosiad ymarferol)',
}

/**
 * Function to transform the category displayed into a more user-friendly format
 * transformCategory
 * @param category
 */
Handlebars.registerHelper('transformCategory', function (category: TestCategory) {
  switch (category) {
  case TestCategory.EUAM1:
  case TestCategory.EUA1M1:
  case TestCategory.EUA1M2:
  case TestCategory.EUAMM1:
    return 'A1';
  case TestCategory.EUAM2:
  case TestCategory.EUA2M1:
  case TestCategory.EUA2M2:
  case TestCategory.EUAMM2:
    return 'A2';
  default:
    return category.replace('+', '');
  }
});

/**
 * Function to check if the test is a third attempt, also returns a bespoke message for SC
 * ifNotThirdAttempt
 * @param thirdAttempt
 * @param category
 */
Handlebars.registerHelper('ifNotThirdAttempt', function (previousAttempts: number, category: TestCategory) {
  let result: string = '';
  if (previousAttempts <= 1) {
    result =  'Caniateir 3 ymgais i chi basio’r prawf ADI rhan 3.';
  } else if (category === TestCategory.SC) {
    result = 'Gan eich bod bellach wedi bod yn aflwyddiannus 3 gwaith, gall y Cofrestrydd ADI ddechrau\'r broses o\'ch tynnu oddi ar y gofrestr ADI.';
  }
  return result;
});

/**
 * Function to generate the end string at the bottom of a failure result template
 * generateFailureEndResultResponse
 * @param category
 * @param thirdAttempt
 */
Handlebars.registerHelper('generateFailureEndResultResponse', function (category: TestCategory, previousAttempts: number) {
  let result: string = '';
  if (previousAttempts >= 2) {
    if(category === TestCategory.SC) {
      result = 'Rydym yn esbonio sut y bydd y broses hon yn gweithio yn ddiweddarach yn yr e-bost hwn.';
    } else result = 'Os ydych yn bwriadu ailgychwyn y broses gymhwyso, mae\'n bwysig deall mwy am y rhesymau nad ydych wedi bod yn llwyddiannus y tro hwn.';
  } else {
    result = `I paratoi ar gyfer eich ${category === TestCategory.SC ? 'arolwg safonau' : 'prawf'} nesaf, mae'n bwysig deall mwy am y rhesymau nad ydych wedi bod yn llwyddiannus y tro hwn.`;
  }
  return result;
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
`;
    break;
  case TestCategory.CCPC:
    template = `
^# Result: Pass\n
^Test type: ${testType} (category {{transformCategory category}})\n
^Test centre: {{location}}\n
^Date: {{date}}
\n^Overall score: {{totalScore}} out of 100

## 
Congratulations on passing your test.
 
To keep improving, it’s important to understand any faults you made.
`;
    break;
  default:
    template = `
^# Result: Pass\n
^Test type: ${testType} ${categorySwitch !== TestCategory.ADI2 ? '(category {{transformCategory category}})' : ''}\n
^Test centre: {{location}}\n
^Date: {{date}}
 
## 
Congratulations on passing your test.
     
To keep improving, it’s important to understand any faults you made.
`;
  }
  return template;
};

/**
 * Function to generate a pass result template in Welsh
 * @param testType
 * @param categorySwitch
 */
export const passResultWelshTemplate = (testType: string, categorySwitch: TestCategory): string => {
  let template: string;
  switch(categorySwitch) {
  case TestCategory.ADI3:
  case TestCategory.SC:
    template = `
^# Canlyniad: Llwyddo (gradd {{grade}})\n
^Math o brawf: {{category}} prawf\n
^Canolfan profi: {{location}}\n
^Dyddiad: {{date}}

## Crynoldeb y ganlyniad

^Sgôr cyffredinol: {{totalScore}} allan o 51

^Cynllunio gwersi: {{lessonPlanningScore}} allan o 12
^Rheoli risg: {{riskManagementScore}} allan o 15
^Strategaethau addysgu a dysgu: {{teachingLearningStrategiesScore}} allan o 24

## Am y wers

^Disgybl – {{studentLevel}} 
^Them(au):
{{#each lessonThemes}}
  - {{ this }} 
{{/each}} 

---

Llongyfarchiadau am pasio eich ${categorySwitch === TestCategory.SC ? 'gwiriad safonau ADI' : 'prawf'}.

Er mwyn parhau i wella, mae'n bwysig deall pa gymwyseddau y gallwch barhau i'w datblygu. 
`;
    break;
  case TestCategory.CCPC:
    template = `
^# Canlyniad: Llwyddiannus
^Math o brawf: Prawf gyrrwr CPC rhan 4 (arddangosiad ymarferol) (categori {{category}})
^Canolfan profi {{location}}
^Dyddiad {{date}}
\n^Sgôr cyffredinol: {{totalScore}} allan o 100

## 
Llongyfarchiadau am pasio eich prawf.
 
I paratoi ar gyfer eich prawf nesaf, mae'n bwysig deall mwy am y rhesymau nad ydych wedi bod yn llwyddiannus y tro hwn.
`;
    break;
  default: template = `
^# Canlyniad: Llwyddiannus\n
^Math o brawf: ${testType} (categori {{transformCategory category}})\n
^Canolfan profi: {{location}}\n
^Dyddiad:  {{date}}

## 
Llongyfarchiadau am pasio eich prawf.
 
Er mwyn parhau i wella, mae'n bwysig deall unrhyw camgymeriadau a wnaethoch.
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

We're sorry that you were unsuccessful
${thirdAttempt ?
    (categorySwitch === TestCategory.ADI3 ?
      'this time and have not qualified as an ADI.\n\n If you intend to restart the qualification process, it’s important to understand more about the competencies you were assessed on.' :
      'on this third attempt at taking your standards check.\n\n Because you have now been unsuccessful 3 times, the ADI Registrar can begin the process of removing you from the ADI register.\n\n We explain how this process will work later in this email.') :
    (categorySwitch === TestCategory.ADI3 ?
      'this time.\n\n You’re allowed 3 attempts to pass the ADI part 3 test.\n\n To prepare for your next test, it’s important to understand more about the competencies you were assessed on.' :
      'this time.\n\n You’re allowed 3 attempts to pass the standards check.\n\n To prepare for your next standards check, it’s important to understand more about the competencies you were assessed on.')}
`;
    break;
  case TestCategory.CCPC:
    template = `
^# Result: Unsuccessful
^Test type: Driver CPC part 4 (practical demonstration) test (category {{category}})\n
^Test centre: {{location}}\n
^Date: {{date}}\n
^Overall score: {{totalScore}} out of 100

## 
We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about your result this time.
`;
    break;
  default: template = `
^# Result: Unsuccessful\n
^Test type: ${testType} (category {{transformCategory category}})\n
^Test centre: {{location}}\n
^Date: {{date}}

## 
We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time.
`;
  }
  return template;
};

/**
 * Function to generate a fail result template in Welsh
 * @param testType
 * @param categorySwitch
 * @param thirdAttempt
 */
export const failResultWelshTemplate = (testType: string, categorySwitch: TestCategory, thirdAttempt?: boolean): string => {
  let template: string;
  switch (categorySwitch) {
  case TestCategory.ADI3:
  case TestCategory.SC:
    template = `
^# Canlyniad: Aflwyddiannus
^Math o brawf: ${testType}
^Canolfan profi: {{location}}
^Dyddiad: {{date}}

## Crynoldeb y ganlyniad

{{#if code4}}
^##Wedi terfynu
{{/if}}
{{#if RMFail}}
^##Methiant Rheoli Risg
{{/if}}

^Sgôr cyffredinol: {{totalScore}} allan o 51

^Cynllunio gwersi: {{lessonPlanningScore}} allan o 12
^Rheoli risg: {{riskManagementScore}} allan o 15
^Strategaethau addysgu a dysgu: {{teachingLearningStrategiesScore}} allan o 24

## Am y wers

^Disgybl – {{studentLevel}} 
^Them(au): 
{{#each lessonThemes}}
  - {{ this }} 
{{/each}}

---

Mae'n ddrwg gennym ${thirdAttempt ? `${categorySwitch === TestCategory.ADI3 ? 'nad oeddech yn llwyddiannus y tro hwn ac nad ydych wedi cymhwyso fel ADI' : 'na fuoch yn llwyddiannus ar y trydydd cynnig hwn i gymryd eich arolwg safonau'}` : 'hwn'}.

{{ifNotThirdAttempt previousAttempts category}}

{{generateFailureEndResultResponse category previousAttempts}}
`;
    break;
  case TestCategory.CCPC:
    template = `
^# Canlyniad: Aflwyddiannus
^Math o brawf: Prawf gyrrwr CPC rhan 4 (arddangosiad ymarferol) (categori {{category}})\n
^Canolfan profi: {{location}}\n
^Dyddiad: {{date}}\n
^Sgôr cyffredinol: {{totalScore}} allan o 100

## 
Mae'n ddrwg gennym nad oeddech yn llwyddiannus y tro hwn ac nad ydych wedi cymhwyso fel ADI.
 
I paratoi ar gyfer eich prawf nesaf, mae'n bwysig deall mwy am y rhesymau nad ydych wedi bod yn llwyddiannus y tro hwn.
`;
    break;
  default:
    template = `
^# Canlyniad: Aflwyddiannus\n
^Math o brawf: ${testType} (categori {{transformCategory category}})\n
^Canolfan profi: {{location}}\n
^Dyddiad:  {{date}}

## 
Mae'n ddrwg gennym nad oeddech yn llwyddiannus y tro hwn ac nad ydych wedi cymhwyso fel ADI.
 
I paratoi ar gyfer eich prawf nesaf, mae'n bwysig deall mwy am y rhesymau nad ydych wedi bod yn llwyddiannus y tro hwn.
`;
  }
  return template;
};
