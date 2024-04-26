/* eslint-disable max-len */
export const drivingFaultsTemplate = `
{{#if showDrivingFaults}}
# Your driving faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Find out more about driving faults:

https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test

{{/if}}
`;

export const drivingFaultsTractorTemplate = `
{{#if showDrivingFaults}}
# Your driving faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Find out more about driving faults:

https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test

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

export const DrivingFaultsWelshTemplate = `
{{#if showDrivingFaults}}
# Eich beiau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Dysgwch ragor am feiau gyrru:

https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test

{{/if}}
`;

export const DrivingFaultsVocationalTemplate = `
{{#if showDrivingFaults}}
# Your driving faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Find out more about driving faults:

https://www.gov.uk/guidance/understanding-your-driving-test-result/lorry-bus-or-coach-driving-test

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

Your overall score was ((totalScore)) out of 100. 

Your scores in each topic were:

- Ability to load the vehicle with due regard for safety rules and proper vehicle use - ((q1Score)) out of 20
- Security of your vehicle and contents - ((q2Score)) out of 20 
- Ability to prevent criminality and trafficking in illegal immigrants -  ((q3Score)) out of 20 
- Ability to assess emergency situations - ((q4Score)) out of 20 
- Ability to prevent physical risk - ((q5Score)) out of 20 
`;

export const DrivingFaultsVocationalWelshTemplate = `
{{#if showDrivingFaults}}
# Eich beiau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Dysgwch ragor am feiau gyrru:

https://www.gov.uk/guidance/understanding-your-driving-test-result/lorry-bus-or-coach-driving-test

{{/if}}
`;

export const RidingFaultsMod1Template = `
{{#if showDrivingFaults}}
# Your riding faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Find out more about riding faults at:

https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-1-off-road-test

{{/if}}
`;

export const RidingFaultsMod2Template = `
{{#if showDrivingFaults}}
# Your riding faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Find out more about riding faults at:

https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-1-off-road-test

{{/if}}
`;

export const RidingFaultsMod1WelshTemplate = `
{{#if showDrivingFaults}}
# Eich beiau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Dysgwch ragor am feiau reidio yn:

https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-1-off-road-test

{{/if}}
`;

export const RidingFaultsMod2WelshTemplate = `
{{#if showDrivingFaults}}
# Eich beiau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Dysgwch ragor am feiau reidio yn:

https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-2-on-road-test

{{/if}}
`;

export const drivingFaultsADI2Template = `
{{#if showDrivingFaults}}
# Your driving faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const DrivingFaultsADI2WelshTemplate = `
{{#if showDrivingFaults}}
# Eich beiau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Dysgwch ragor am feiau gyrru:

https://www.gov.uk/guidance/understanding-your-driving-test-result/approved-driving-instructor-adi-part-2-driving-ability-test

{{/if}}
`;

export const DrivingFaultsHomeTemplate = `
{{#if showDrivingFaults}}
# Your driving faults:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Find out more about driving faults:

https://www.gov.uk/guidance/understanding-your-driving-test-result/tractor-or-specialist-vehicle-driving-test

{{/if}}
`;

export const DrivingFaultsHomeWelshTemplate = `
{{#if showDrivingFaults}}
# Eich beiau gyrru:
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

Dysgwch ragor am feiau gyrru:

https://www.gov.uk/guidance/understanding-your-driving-test-result/tractor-or-specialist-vehicle-driving-test))t

{{/if}}
`;
