/* eslint-disable max-len */
export const passDrivingTemplate = `
^#You passed your category {{ category }} driving test on {{ date }} in {{ location }}.

`;

export const passDrivingWelshTemplate = `
^#Fe wnaethoch basio eich prawf gyrru categori {{ category }} ar {{ date }} yn {{ location }}.

`;

export const passRidingTemplate = `
^#You passed your category {{ category }} motorcycle test on {{ date }} in {{ location }}.

`;

export const passRidingWelshTemplate = `
^#Gwnaethoch chi basio eich prawf beic modur categori {{ category }} ar {{ date }} yn {{ location }}.

`;

export const failDrivingTemplate = `
^#You were unsuccessful in your category {{ category }} driving test on {{ date }} in {{ location }}.

`;

export const failDrivingWelshTemplate = `
^#Fe wnaethoch basio eich prawf gyrru categori  {{ category }} ar {{ date }} yn {{ location }}.

`;

export const failRidingTemplate = `
^#You were unsuccessful in your category {{ category }} motorcycle test on {{ date }} in {{ location }}.

`;

export const failRidingWelshTemplate = `
^#Roeddech yn aflwyddiannus yn eich prawf beic modur categori {{ category }} ar {{ date }} yn {{ location }}.

`;

export const adi3Template = `
^#You {{ result }} {{ positionType }} your {{ isADI3??category }} {{ categoryDescriptor }} test on {{ date }} in {{ location }}.

`;

export const adi3ResultsTemplate = `
#Find out more about your test result
Find out more about your test result, what to do next and information on how to appeal your test:
{{#if isADI3??}}https://www.gov.uk/adi-part-3-test/test-result{{/if}}
{{#if isSC??}}https://www.gov.uk/adi-standards-check/your-standards-check-grade{{/if}}

`;
