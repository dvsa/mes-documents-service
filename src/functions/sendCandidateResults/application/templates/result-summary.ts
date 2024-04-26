/* eslint-disable max-len */
export const passDrivingTemplate = `
^ # You passed your category {{ category }} driving test on {{ date }} in {{ location }}.
`;
export const passDrivingCPC4Template = `
^# Result: Pass
^ Test type: Driver CPC part 4 (practical demonstration) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
^ Overall score: {{totalScore}} out of 100

Congratulations on passing your test.
 
To keep improving, it’s important to understand more about your result this time.
`;

export const passDrivingBTemplate = `
^# Result: Pass
^ Test type: car driving test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
 
Congratulations on passing your test.
 
To keep improving, it’s important to understand any faults you made. 
`;

export const failDrivingBTemplate = `
^# Result: Unsuccessful
^ Test type: car driving test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time.
`;

export const passDrivingWelshTemplate = `
^ # Fe wnaethoch basio eich prawf gyrru categori {{ category }} ar {{ date }} yn {{ location }}.
`;

export const passVocational4Template = `
^# Result: Pass
^ Test type: Driver CPC part 4 (practical demonstration) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
^ Overall score: {{totalScore}} out of 100

Congratulations on passing your test.
 
To keep improving, it’s important to understand more about your result this time.

`;
export const passVocational3bTemplate = `
^# Result: Pass
^ Test type: Driver CPC part 3b (on-road driving) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
^ Score: {{totalScore}}

 
Congratulations on passing your test.
 
To keep improving, it’s important to understand any faults you made. 
`;

export const passTractorTemplate = `
^# Result: Pass
^ Test type: tractor or specialist vehicle driving test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}

Congratulations on passing your test.

To keep improving, it’s important to understand any faults you made. 
`;

export const passMod2Template = `
^# Result: Pass
^ Test type: motorcycle module 2 (on-road) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
 
Congratulations on passing your test.
 
To keep improving, it’s important to understand any faults you made. 

`;

export const passVocational3aTemplate = `
^# Result: Pass
^ Test type: Driver CPC part 3a (off-road exercises) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
 
Congratulations on passing your test.
`;

export const passRidingTemplate = `
^ # You passed your category {{ category }} motorcycle test on {{ date }} in {{ location }}.
`;

export const passRidingWelshTemplate = `
^ # Gwnaethoch chi basio eich prawf beic modur categori {{ category }} ar {{ date }} yn {{ location }}.
`;

export const passCpcTemplate = `
^ # You passed your {{#if showLGVText}}LGV{{/if}}{{#if showPCVText}}PCV{{/if}} CPC Module 4 test on {{ date }} in {{ location }}.
`;

export const passCpcWelshTemplate = `
^ # Fe wnaethoch basio eich prawf CPC Modiwl 4 {{#if showLGVText}}LGV{{/if}}{{#if showPCVText}}PCV{{/if}} ar {{ date }} yn {{ location }}.
`;

export const failDrivingTemplate = `
^ # You were unsuccessful in your category {{ category }} driving test on {{ date }} in {{ location }}.
`;

export const passDrivingAdi2Template = `
^# Result: Pass
^ Test type: ADI part 2 (driving ability) test
^ Test centre: {{location}}
^ Date: {{date}}
 
Congratulations on passing your test.
 
To keep improving, it’s important to understand any faults you made.
`;

export const failDrivingAdi2Template = `
^# Result: Unsuccessful
^ Test type: ADI part 2 (driving ability) test
^ Test centre: {{location}}
^ Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time. 
`;

export const failDrivingWelshTemplate = `
^ # Roeddech chi’n aflwyddiannus yn eich prawf gyrru categori {{ category }} ar {{ date }} yn {{ location }}.
`;

export const passAdi3Template = `
^ # Result: Pass (grade {{grade}})
^ Test type {{category}} test
^ Test centre: {{location}}
^ Date: {{date}}

## Result summary

^ Overall score:{{totalScore}} out of 51
^ 
^ Lesson planning: {{lessonPlanningScore}} out of 12
^ Risk management: {{riskManagementScore}} out of 15
^ Teaching and learning strategies:{{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student – {{studentLevel}} 
^Theme(s): 
^{{lessonThemes}} 

---

Congratulations on passing your test.

To keep improving, it’s important to understand which competences you can continue to develop. 

---
`;

export const failAdi3FirstOrSecondTemplate = `
^ # Result: Unsuccessful
^ Test type: ADI part 3 (instructional ability) test
^ Test centre: {{location}}
^ Date: {{date}}

## Result summary

{{code4??^ ##Terminated}}
{{RMFail??^ ##Risk management fail}}
^ 
^ Overall score:{{totalScore}} out of 51
^ 
^ Lesson planning: {{lessonPlanningScore}} out of 12
^ Risk management: {{riskManagementScore}} out of 15
^ Teaching and learning strategies:{{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student – {{studentLevel}} 
^Theme(s): 
^{{lessonThemes}} 

---

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the competences you were assessed on.

---
`;

export const failAdi3ThirdTemplate = `
^ # Result: Unsuccessful
^ Test type: ADI part 3 (instructional ability) test
^ Test centre: {{location}}
^ Date: {{date}}

## Result summary

{{code4??^ ##Terminated}}
{{RMFail??^ ##Risk management fail}}
^ 
^ Overall score:{{totalScore}} out of 51
^ 
^ Lesson planning: {{lessonPlanningScore}} out of 12
^ Risk management: {{riskManagementScore}} out of 15
^ Teaching and learning strategies:{{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student – {{studentLevel}} 
^Theme(s): 
^{{lessonThemes}} 

---

We're sorry that you were unsuccessful this time and have not qualified as an ADI. 

If you intend to restart the qualification process, it’s important to understand more about the competences you were assessed on.

---
`;

export const passSCTemplate = `
^ # Result: Pass (grade {{grade}})
^ Test type: ADI standards check
^ Test centre: {{location}}
^ Date: {{date}}

## Result summary

^ Overall score:{{totalScore}} out of 51
^ 
^ Lesson planning: {{lessonPlanningScore}} out of 12
^ Risk management: {{riskManagementScore}} out of 15
^ Teaching and learning strategies:{{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student –{{studentLevel}} 
^Theme(s): 
^{{lessonThemes}} 

---

Congratulations on passing your ADI standards check.

To keep improving, it’s important to understand which competences you can continue to develop. 

---
`;

export const failScFirstOrSecondTemplate = `
^ # Result: Unsuccessful
^ Test type: ADI standards check
^ Test centre: {{location}}
^ Date: {{date}}

## Result summary

{{code4??^ ##Terminated}} 
{{RMFail??^ ##Risk management fail}}
^ 
^ Overall score:{{totalScore}} out of 51
^ 
^ Lesson planning: {{lessonPlanningScore}} out of 12
^ Risk management: {{riskManagementScore}} out of 15
^ Teaching and learning strategies:{{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student –{{studentLevel}} 
^Theme(s): 
^{{lessonThemes}} 

---

We're sorry that you were unsuccessful this time.

You’re allowed 3 attempts to pass the standards check.

To prepare for your next standards check, it’s important to understand more about the competences you were assessed on.

---
`;

export const failScThirdTemplate = `
^ # Result: Unsuccessful
^ Test type: ADI standards check
^ Test centre: {{location}}
^ Date: {{date}}

## Result summary

{{code4??^ ##Terminated}} 
{{RMFail??^ ##Risk management fail}}
^ 
^ Overall score:{{totalScore}} out of 51
^ 
^ Lesson planning: {{lessonPlanningScore}} out of 12
^ Risk management: {{riskManagementScore}} out of 15
^ Teaching and learning strategies:{{teachingLearningStrategiesScore}} out of 24

## About the lesson

^Student –{{studentLevel}} 
^Theme(s): 
^{{lessonThemes}} 

---

We're sorry that you were unsuccessful on this third attempt at taking your standards check. 

Because you have now been unsuccessful 3 times, the ADI Registrar can begin the process of removing you from the ADI register. 

We explain how this process will work later in this email. 

---
`;

export const failTractorTemplate = `
^# Result: Unsuccessful
^ Test type: Driver CPC part 4 (practical demonstration) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
^ Overall score: {{totalScore}} out of 100

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about your result this time.
`;

export const failVocational4Template = `
^# Result: Unsuccessful
^ Test type: Driver CPC part 4 (practical demonstration) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}
^ Overall score: {{totalScore}} out of 100

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about your result this time.
`;

export const failVocational3bTemplate = `
^# Result: Unsuccessful
^ Test type: Driver CPC part 3b (on-road driving) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time. 
`;

export const failMod2Template = `
^# Result: Unsuccessful
^ Test type: motorcycle module 2 (on-road) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time. 
`;

export const failVocational3aTemplate = `
^# Result: Unsuccessful
^ Test type: Driver CPC part 3a (off-road exercises) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time. 
`;

export const failAMod1Template = `
^# Result: Unsuccessful
^ Test type: motorcycle module 1 (off-road) test (category {{category}})
^ Test centre: {{location}}
^ Date: {{date}}

We're sorry that you were unsuccessful this time.

To prepare for your next test, it’s important to understand more about the faults you made this time.
`;
