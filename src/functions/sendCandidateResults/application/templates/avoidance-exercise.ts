export const AvoidanceExerciseTemplate = `
# Avoidance Exercise / Controlled Stop
First attempt: {{ avoidanceFirstAttempt }}
{{#if showAvoidanceSecondAttempt}}

Second attempt: {{ avoidanceSecondAttempt }}
{{/if}}
`;

export const AvoidanceExerciseWelshTemplate = `
# Ymarfer Osgoi / Stop dan Reolaeth
Ymgais gyntaf: {{ avoidanceFirstAttempt }}
{{#if showAvoidanceSecondAttempt}}

Ail ymgais: {{ avoidanceSecondAttempt }}
{{/if}}
`;
