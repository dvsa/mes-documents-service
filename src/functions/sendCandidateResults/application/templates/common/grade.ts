export const gradeTemplate = `
{{#if showGrade}}
#Grade - {{grade}}
{{/if}}
{{#if code4}}
#Terminated
{{/if}}
{{#if RMFail}}
#Risk Management Fail
{{/if}}

`;
