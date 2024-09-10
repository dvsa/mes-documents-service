export const avoidanceExerciseTemplate = `
{{#if avoidanceFirstAttempt}}
# Avoidance Exercise / Controlled Stop
First attempt: {{ avoidanceFirstAttempt }}
{{/if}}
{{#if showAvoidanceSecondAttempt}}

Second attempt: {{ avoidanceSecondAttempt }}
{{/if}}
`;

export const avoidanceExerciseWelshTemplate = `
{{#if showAvoidanceExercise}}
# Ymarfer osgoi a stopio rheoledig
Cynnig cyntaf: {{avoidanceFirstAttempt}}
{{/if}}
{{#if showAvoidanceSecondAttempt}}

Ail ymgais: {{avoidanceSecondAttempt}}
{{/if}}
`;
