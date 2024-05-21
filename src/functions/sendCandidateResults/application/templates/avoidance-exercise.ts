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
# Ymarfer Osgoi / Stop dan Reolaeth
Ymgais gyntaf: {{ avoidanceFirstAttempt }}
{{#if showAvoidanceSecondAttempt}}

Ail ymgais: {{ avoidanceSecondAttempt }}
{{/if}}
`;
