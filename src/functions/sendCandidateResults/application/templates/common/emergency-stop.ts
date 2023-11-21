export const EmergencyStopTemplate = `
#Emergency stop
First attempt: {{ emergencyFirstAttempt }}
{{#if showEmergencySecondAttempt}}

Second attempt: {{ emergencySecondAttempt }}
{{/if}}

`;

export const EmergencyStopTemplateWelshTemplate = `
#Stop argyfwng
Ymgais gyntaf: {{ emergencyFirstAttempt }}
{{#if showEmergencySecondAttempt}}

Ail ymgais: {{ emergencySecondAttempt }}
{{/if}}

`;
