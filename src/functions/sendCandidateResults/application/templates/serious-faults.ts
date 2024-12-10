export const seriousFaultsTemplate = `
{{#if showSeriousFaults}}
# Your serious faults
  {{#each seriousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;

export const seriousFaultsWelshTemplate = `
{{#if showSeriousFaults}}
# Eich camgymeriadau difrifol
  {{#each seriousFaults}}
  - {{ this }}
  {{/each}}

{{/if}}
`;
