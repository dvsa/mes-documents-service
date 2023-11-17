export const DrivingFaultsTemplate = `
{{#if showDrivingFaults}}
#Your driving faults:
{{ drivingFaults }}

{{/if}}
Find out more about driving faults:

Car
https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test

`;

export const DrivingFaultsWelshTemplate = `
{{#if showDrivingFaults}}
Eich beiau gyrru:
{{ drivingFaults }}

{{/if}}
Dysgwch ragor am feiau gyrru:

Car
https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test

`;
