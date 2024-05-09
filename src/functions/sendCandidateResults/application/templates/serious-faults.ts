export const seriousFaultsTemplate = `
{{#if showSeriousFaults}}
# Your serious faults:
  {{#each seriousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;
