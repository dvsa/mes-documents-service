/* eslint-disable max-len */
export const drivingFaultsTemplate = `
{{#if showDrivingFaults}}
# Your driving faults
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const drivingFaultsWelshTemplate = `
{{#if showDrivingFaults}}
# Eich camgymeriadau gyrru
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const ridingFaultTemplate = `
{{#if showDrivingFaults}}
# Your riding faults
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}
{{/if}}
`;

export const ridingFaultWelshTemplate = `
{{#if showDrivingFaults}}
# Eich camgymeriadau beicio
  {{#each drivingFaults}}
  - {{ this }}
  {{/each}}
{{/if}}
`;

export const vocationalScoringExplanation = `
# How the scoring works
 
You could score up to 20 points in each of the 5 topics you were tested on.

To pass, you needed to both:

- score 15 or more in each of the 5 topics
- achieve an overall score of at least 80
`;

export const vocationalScoringExplanationWelsh = `
# Sut mae'r sgorio yn gweithio
 
Gallech sgorio hyd at 20 pwynt ym mhob un o'r 5 pwnc y cawsoch eich profi arnynt.

I basio, roedd rhaid:

- sgorio 15 neu mwy ym mhob un o'r 5 pwnc
- cyflawni sgôr cyffredinol o 80 o leiaf

---

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

export const vocationalScoringWelsh = `
# Eich sgôr

Roedd eich sgôr cyffredinol yn {{totalScore}} allan o 100. 

Eich sgorau ym mhob pwnc oedd:

- Y gallu i lwytho'r cerbyd gan roi sylw dyledus i reolau diogelwch a defnydd cywir o'r cerbyd - {{q1Score}} allan o 20
- Diogelwch eich cerbyd a'ch cynnwys - {{q2Score}} allan o 20
- Y gallu i atal troseddoldeb a masnachu mewn mewnfudwyr anghyfreithlon - {{q3Score}} allan o 20
- Y gallu i asesu sefyllfaoedd argyfwng - {{q4Score}} allan o 20
- Y gallu i atal lle rhag risg corfforol - {{q5Score}} allan o 20

---

`;
