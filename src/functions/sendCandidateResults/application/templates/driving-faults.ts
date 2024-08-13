/* eslint-disable max-len */
export const drivingFaultsTemplate = `
{{#if showDrivingFaults}}
# Your driving faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const drivingFaultsWelshTemplate = `
{{#if showDrivingFaults}}
# Eich camgymeriadau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const ridingFaultTemplate = `
{{#if showDrivingFaults}}
# Your riding faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}
{{/if}}
`;

export const vocationalScoringExplanation = `
# How the scoring works
 
You could score up to 20 points in each of the 5 topics you were tested on.

To pass, you needed to both:

- score at 15 or more in each of the 5 topics
- achieve an overall score of at least 80
`;

export const vocationalScoring = `
# Your scores

Your overall score was {{totalScore}} out of 100. 

Your scores in each topic were:

- Ability to load the vehicle with due regard for safety rules and proper vehicle use - {{q1Score}} out of 20
- Security of your vehicle and contents - {{q2Score}} out of 20 
- Ability to prevent criminality and trafficking in illegal immigrants -  {{q3Score}} out of 20 
- Ability to assess emergency situations - {{q4Score}} out of 20 
- Ability to prevent physical risk - {{q5Score}} out of 20 
`;
