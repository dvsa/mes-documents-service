/* eslint-disable max-len */
import * as Handlebars from 'handlebars';
import {TestCategory} from '@dvsa/mes-test-schema/category-definitions/common/test-category';


/**
 * Function to determine if the eco explanation should be displayed
 * displayEcoExplanation
 * @param category
 */
Handlebars.registerHelper('displayEcoExplanation', function (category) {
  const ecoCategories = [
    TestCategory.B,
    TestCategory.F,
    TestCategory.G,
    TestCategory.H,
    TestCategory.K,
    TestCategory.C,
    TestCategory.C1,
    TestCategory.CE,
    TestCategory.C1E,
    TestCategory.D,
    TestCategory.D1,
    TestCategory.DE,
    TestCategory.D1E,
  ].map(category => `'${category}'`).join(' ');

  return ecoCategories.includes(category);
});

/**
 * Function to generate a riding or driving eco template
 * @param riding
 */
export const ecoTemplate = (riding?: boolean): string => {
  return `
{{#if showEcoText}}
# Fuel-efficient ${riding ? 'riding' : 'driving'}

{{#if (displayEcoExplanation category)}}
Fuel-efficient ${riding ? 'riding' : 'driving'} is a style of safe driving that reduces your fuel use and helps the environment.
{{/if}}

${riding ? 'The motorcycle' : 'Your driving'} examiner saw that you could improve the control and planning of your driving. You should aim to ${riding ? 'ride' : 'drive'} in a fuel-efficient manner, considering your impact on the environment.
{{/if}}

`;
};

export const ecoWelshTemplate = (riding?: boolean): string => {
  return `
{{#if showEcoText}}
# Gyrru tanwydd-effeithlon

{{#if (displayEcoExplanation category)}}
Mae gyrru tanwydd-effeithlon yn arddull gyrru diogel sy'n Ileihau eich defnydd o danwydd ac yn helpu'r amgylchedd.
{{/if}}

Sylwodd yr arholwr gyrru y gallech wella rheolaeth a gynlluniad eich gyrru. Dylech anelu i yrru mewn modd tanwydd-effeithlon, gan ystyried eich effaith ar yr amgylchedd.
{{/if}}

`;
};
