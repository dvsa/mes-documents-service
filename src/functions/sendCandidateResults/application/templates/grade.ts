/**
 * Function to generate a grade template for ADI3 & SC templates
 * @param fail
 * @param standardsCheck
 */
export const gradeTemplate = (fail: boolean, standardsCheck: boolean): string => {
  return `
# How the assessment worked

You were assessed on 17 competences across 3 topics. 

You could score 0 to 3 points for each competence. The scores mean:

- 0 - No evidence of the competence
- 1 -  Demonstrated in a few elements 
- 2 - Demonstrated in most elements 
- 3 - Demonstrated in all elements

## Lesson planning

You scored {{lessonPlanningScore}} out of 12 in lesson planning.

You were assessed on 4 competences in this topic: 

- Identify learning goals and needs - {{lp1Score}} out of 3
- Use an appropriate lesson structure - {{lp2Score}} out of 3
- Choose suitable practice areas - {{lp3Score}} out of 3
- Adapt the lesson plan when appropriate - {{lp4Score}} out of 3

## Risk management

You scored {{riskManagementScore}} out of 15 in risk management.

{{#if ${fail}}}
You needed to score 8 or more in this topic to pass the ${standardsCheck ? 'standards check' : 'test'}.
{{/if}}

You were assessed on 5 competences in this topic:

- Share the responsibility for risk - {{rm1Score}} out of 3
- Give clear, timely and suitable directions and instructions - {{rm2Score}} out of 3
- Maintain awareness of your surroundings and the pupil’s actions  - {{rm3Score}} out of 3
- Make timely and appropriate verbal and physical interventions - {{rm4Score}} out of 3
- Help the pupil understand potential safety critical incidents - {{rm5Score}} out of 3

## Teaching and learning strategies

You scored {{teachingLearningStrategiesScore}} out of 24 in teaching and learning strategies.

You were assessed on 8 competences in this topic:

- Use a suitable teaching and learning style - {{tls1Score}} out of 3
- Encourage problem analysis and responsibility for learning - {{tls2Score}} out of 3
- Clarify learning outcomes - {{tls3Score}} out of 3
- Give correct and appropriate technical information - {{tls4Score}} out of 3
- Give appropriate and timely feedback during the session - {{tls5Score}} out of 3
- Follow-up and answer the pupil’s queries - {{tls6Score}} out of 3
- Maintain an appropriate manner - {{tls7Score}} out of 3
- Encourage the pupil to reflect on their performance - {{tls8Score}} out of 3

## Feedback from the examiner 

The examiner gave this feedback:

^{{feedback}}

---
    `;
};
