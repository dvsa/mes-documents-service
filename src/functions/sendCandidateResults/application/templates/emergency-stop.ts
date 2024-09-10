export const emergencyStopTemplate = `
{{#if emergencyFirstAttempt}}
# Emergency stop
First attempt: {{ emergencyFirstAttempt }}
{{/if}}
{{#if showEmergencySecondAttempt}}

Second attempt: {{ emergencySecondAttempt }}
{{/if}}
`;

export const emergencyStopWelshTemplate = `
{{#if showEmergencyStop}}
# Stopio brys
Cynnig cyntaf: {{emergencyFirstAtempt}}
{{/if}} 
{{#if showEmergencySecondAttempt}}

Ail ymgais: {{emergencySecondAttempt}}
{{/if}}
`;
