/* eslint-disable max-len */
export const otherEnglishpadi = `
ADI Name – {{ candidateName }}

PRN – {{ prn }}

{{#if isADI3}}The above PDI has now failed their 3rd attempt at the Part 3 test and may have a trainee licence which requires attention.{{/if}}
{{#if isSC}}The above ADI has now failed their 3rd attempt at the Standards check, please consider starting the removal process.{{/if}}

`;

export const otherWelshpadi = `
${otherEnglishpadi}
`;
