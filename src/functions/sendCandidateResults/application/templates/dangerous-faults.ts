export const dangerousFaultsTemplate = `
{{#if showDangerousFaults}}
# Your dangerous faults:
  {{#each dangerousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;
