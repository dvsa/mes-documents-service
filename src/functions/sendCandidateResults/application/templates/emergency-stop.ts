export const emergencyStopTemplate = `
{{#if emergencyFirstAttempt}}
# Emergency stop
First attempt: {{ emergencyFirstAttempt }}
{{/if}}
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
