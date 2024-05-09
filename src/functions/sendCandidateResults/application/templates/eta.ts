export const etaTemplate = `
{{#if showEtaText}}
# Your examiner had to take action

{{/if}}
{{#if showEtaVerbal}}
During your test, your examiner had to tell you to do something to avoid an incident.

{{/if}}
{{#if showEtaPhysical}}
During your test, your examiner had to take control of the vehicle to avoid an incident.

{{/if}}
`;
