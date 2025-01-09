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

export const etaWelshTemplate = `
{{#if showEtaText}}
# Roedd yn rhaid i'ch arholwr weithredu
    
{{/if}}
{{#if showEtaVerbal}}
Yn ystod eich prawf, roedd yn rhaid i'ch arholwr ddweud wrthych am wneud rhywbeth i osgoi digwyddiad.
        
{{/if}}
{{#if showEtaPhysical}}
Yn ystod eich prawf, roedd yn rhaid i'ch arholwr cymryd rheolaeth ar y cerbyd i osgoi digwyddiad.

{{/if}}
`;
