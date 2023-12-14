export const SeriousFaultsTemplate = `
{{#if showSeriousFaults}}
# Your serious faults:
  {{#each seriousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const SeriousFaultsWelshTemplate = `
{{#if showSeriousFaults}}
# Eich beiau difrifol:
  {{#each seriousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;
