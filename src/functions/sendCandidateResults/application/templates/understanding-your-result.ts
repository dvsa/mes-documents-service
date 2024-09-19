/* eslint-disable max-len */
import * as Handlebars from 'handlebars';

export enum UrlDescriptors {
  DRIVING = 'Find out more about driving test faults and results',
  RIDING = 'Find out more about motorcycle test faults and results',
  ADI2 = 'Find out more about ADI part 2 test faults and results',
}

export enum UrlDescriptorsWelsh {
  DRIVING = 'Darganfod mwy am namau a chanlyniadau prawf gyrru',
  RIDING = 'Darganfod mwy am namau a chanlyniadau prawf beic modur',
  ADI2 = 'Darganfod mwy am namau a chanlyniadau prawf ADI rhan 2',
}

export enum PassUrls {
  ADI2 = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/approved-driving-instructor-adi-part-2-driving-ability-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=pass',
  B = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=pass',
  MOD1 = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-1-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=pass',
  MOD2 = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-2-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=pass',
  VOCATIONAL = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/lorry-bus-or-coach-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=pass',
  TRACTOR = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/tractor-or-specialist-vehicle-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=pass',
}

export enum FailUrls {
  ADI2 = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/approved-driving-instructor-adi-part-2-driving-ability-test?utm_source=dvsa&utm_medium=email&utm_campaign=adi-part-2-test&utm_content=unsuccessful',
  B = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/car-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=car-driving-test&utm_content=unsuccessful',
  MOD1 = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-1-off-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=unsuccessful',
  MOD2 = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/motorcycle-module-2-on-road-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=unsuccessful',
  VOCATIONAL = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/lorry-bus-or-coach-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3b-test&utm_content=unsuccessful',
  MANOEUVRES = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/lorry-bus-or-coach-driving-test-off-road-exercises?utm_source=dvsa&utm_medium=email&utm_campaign=vocational-3a-test&utm_content=unsuccessful',
  TRACTOR = 'https://www.gov.uk/guidance/understanding-your-driving-test-result/tractor-or-specialist-vehicle-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=tractor-specialist-vehicle-test&utm_content=unsuccessful',
}

Handlebars.registerHelper('displayUrl', function (communicationMethod: string, url: string, urlDescriptor: string) {
  if (communicationMethod === 'email') {
    return `^[${urlDescriptor}](${url})`;
  } else return `^${urlDescriptor}: ${url}`;
});

/**
 * Function to generate an understanding your result template
 * @param urlDescriptor
 * @param url
 * @param fail
 */
export const understandingResultTemplate = (urlDescriptor: string, url: string, fail?: boolean): string => {
  return `
# Understanding your result

Check our guide which explains:

- what your driving examiner assessed during your test
- what you needed to do
- how to improve your skills, knowledge and understanding in each area
{{#if ${fail}}}
- how to book a new test when you're ready
{{/if}}

{{displayUrl communicationMethod ${url} ${urlDescriptor}}}
  `;
};

/**
 * Function to generate an understanding your result template in Welsh
 * @param urlDescriptor
 * @param url
 * @param fail
 */
export const understandingResultWelshTemplate = (urlDescriptor: string, url: string, fail?: boolean): string => {
  return `
# Deall eich canlyniad

Gwiriwch ein canllaw sy'n esbonio:

- yr hyn a aseswyd gan eich archwiliwr gyrru yn ystod eich prawf
- yr hyn oedd rhaid i chi gwneud
- sut i wella eich sgiliau, gwybodaeth a dealltwriaeth ym mhob rhan
{{#if ${fail}}}
- sut i trefnu prawf newydd pan fyddech yn barod
{{/if}}

{{displayUrl communicationMethod ${url} ${urlDescriptor}}}
  `;
};
