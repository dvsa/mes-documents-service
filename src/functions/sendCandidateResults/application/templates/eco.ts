/* eslint-disable max-len */
/**
 * Function to generate a riding or driving eco template
 * @param riding
 */
export const ecoTemplate = (riding?: boolean): string => {
  return `
{{#if showEcoText}}
# Fuel-efficient ${riding ? 'riding' : 'driving'}

Fuel-efficient ${riding ? 'riding' : 'driving'} is a style of safe driving that reduces your fuel use and helps the environment.

${riding ? 'The motorcycle' : 'Your driving'} examiner saw that you could improve the control and planning of your driving. You should aim to ${riding ? 'ride' : 'drive'} in a fuel-efficient manner, considering your effect on the environment.
{{/if}}
`;
};
