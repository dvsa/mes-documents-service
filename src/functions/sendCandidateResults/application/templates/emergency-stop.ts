export const emergencyStopTemplate = `
# Emergency stop
First attempt: {{ emergencyFirstAttempt }}
{{#if showEmergencySecondAttempt}}

Second attempt: {{ emergencySecondAttempt }}
{{/if}}
`;

export const emergencyStopTemplateWelshTemplate = `
# Stop argyfwng
Ymgais gyntaf: {{ emergencyFirstAttempt }}
{{#if showEmergencySecondAttempt}}

Ail ymgais: {{ emergencySecondAttempt }}
{{/if}}
`;
