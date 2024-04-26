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

export const etaTemplateWelsh = `
{{#if showEtaText}}
# Cymerodd eich arholwr gamau

{{/if}}
{{#if showEtaVerbal}}
Yn ystod eich prawf roedd angen i’ch arholwr gymryd camau ar lafar.

{{/if}}
{{#if showEtaPhysical}}
Yn ystod eich prawf roedd angen i’ch arholwr gymryd camau corfforol.

{{/if}}
`;
