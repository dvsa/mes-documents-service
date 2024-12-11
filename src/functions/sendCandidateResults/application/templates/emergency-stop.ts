export const emergencyStopTemplate = `
{{#if showEmergencyFirstAttempt}}
# Emergency stop
First attempt: {{ emergencyFirstAttempt }}
{{/if}}
{{#if showEmergencySecondAttempt}}

Second attempt: {{ emergencySecondAttempt }}
{{/if}}
`;

export const emergencyStopWelshTemplate = `
{{#if showEmergencyFirstAttempt}}
# Stopio brys
Cynnig cyntaf: {{emergencyFirstAttempt}}
{{/if}} 
{{#if showEmergencySecondAttempt}}

Ail ymgais: {{emergencySecondAttempt}}
{{/if}}
`;
