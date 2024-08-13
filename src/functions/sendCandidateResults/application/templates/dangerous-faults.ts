export const dangerousFaultsTemplate = `
{{#if showDangerousFaults}}
# Your dangerous faults:
  {{#each dangerousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const dangerousFaultsWelshTemplate = `
{{#if showDangerousFaults}}
# Eich camgymeriadau peryglus:
  {{#each dangerousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;
