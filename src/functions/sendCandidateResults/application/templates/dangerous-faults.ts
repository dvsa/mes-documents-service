export const DangerousFaultsTemplate = `
{{#if showDangerousFaults}}
#Your dangerous faults:
  {{#each dangerousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const DangerousFaultsWelshTemplate = `
{{#if showDangerousFaults}}
#Eich beiau peryglus:
  {{#each dangerousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;
