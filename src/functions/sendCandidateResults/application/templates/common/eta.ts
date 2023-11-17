export const etaTemplate = `
{{#if showEtaText}}
#Your examiner took action

{{/if}}
{{#if showEtaVerbal}}
During your test your examiner needed to take verbal action.

{{/if}}
{{#if showEtaPhysical}}
During your test your examiner needed to take physical action.

{{/if}}
`;

export const etaTemplateWelsh = `
{{#if showEtaText}}
#Cymerodd eich arholwr gamau

{{/if}}
{{#if showEtaVerbal}}
Yn ystod eich prawf roedd angen i’ch arholwr gymryd camau ar lafar.

{{/if}}
{{#if showEtaPhysical}}
Yn ystod eich prawf roedd angen i’ch arholwr gymryd camau corfforol.

{{/if}}
`;
