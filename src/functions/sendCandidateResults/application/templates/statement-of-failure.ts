/* eslint-disable max-len */
export const statementOfFailureTemplate = `
# Statement of failure to pass practical test

^Driving test reference number: {{applicationReference}}
^
^The candidate with the number shown above has been examined and has FAILED to pass the practical test / test of competence to drive prescribed under the Road Traffic Act in respect of vehicles in the above category / categories.
`;
export const statementOfFailureMod1Template = `
# Statement of failure to pass practical test 

^Motorcycle test reference number:((applicationReference)) 
^
^The candidate with the number shown above has been examined and has FAILED to pass the manoeuvres test prescribed for the purposes of section 89 of the Road Traffic Act 1988 and for the purposes of section 36 of the Road Traffic Offenders Act 1988. 

## How to appeal your motorcycle test 

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^[Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-1-test&utm_content=unsuccessful).
`;

export const statementOfFailureMod2Template = `
# Statement of failure to pass practical test 

^ Motorcycle test reference number:((applicationReference)) 
^ 
^ The candidate with the number shown above has been examined and has FAILED to pass the manoeuvres test prescribed for the purposes of section 89 of the Road Traffic Act 1988 and for the purposes of section 36 of the Road Traffic Offenders Act 1988. 

## How to appeal your motorcycle test 

You can appeal to a court if you think your driving examiner did not follow the law about how they must carry out driving tests.

The court cannot change your test result. If you win your appeal, they can decide you should get a free retest. If you lose your appeal, you might have to pay significant legal costs.

^ [Find out how to appeal if you think your examiner did not follow the law](https://www.gov.uk/guidance/appeal-your-driving-test?utm_source=dvsa&utm_medium=email&utm_campaign=motorcycle-module-2-test&utm_content=unsuccessful).
`;

export const statementOfFailureBTemplate = `
# Statement of failure to pass practical test

^Driving test reference number: {{applicationReference}}
^
^The candidate with the number shown above has been examined and has FAILED to pass the practical test / test of competence to drive prescribed under the Road Traffic Act (and for the purpose of section 36 of the Road Traffic Offenders Act 1988) in respect of vehicles in the above category / categories.
`;

export const StatementOfFailureVocationalTemplate = `
# Statement of failure to pass practical test
Driving test reference number: {{ applicationReference }}

The candidate with the number shown above has been examined and has FAILED to pass the practical test / test of competence to drive prescribed under the Road Traffic Act (and for the purpose of section 36 of the Road Traffic Offenders Act 1988) in respect of vehicles in the above category / categories.

# How to appeal your driving test
You can appeal if you think your examiner did not follow the regulations as outlined at https://www.gov.uk/guidance/guidance-for-driving-examiners-carrying-out-driving-tests-dt1 when they carried out your test. Contact your local magistrate’s court within 6 months to appeal in England and Wales. If you live in Scotland, contact your local sheriff’s court within 21 days.
Your test result cannot be changed, but you might get a free retest if your appeal is successful. You might need to pay court costs if your appeal does not succeed.
`;

export const statementOfFailureVocational3bTemplate = `
# Statement of failure to pass practical test

^Driving test reference number: {{applicationReference}}
^
^The candidate with the number shown above has been examined and has FAILED to pass the practical test / test of competence to drive prescribed under the Road Traffic Act in respect of vehicles in the above category / categories.

`;

export const statementOfFailureTractorTemplate = `
# Statement of failure to pass practical test

^Driving test reference number: ((applicationReference)) 
^ 
^The candidate with the number shown above has been examined and has FAILED to pass the practical test / test of competence to drive prescribed under the Road Traffic Act (and for the purpose of section 36 of the Road Traffic Offenders Act 1988) in respect of vehicles in the above category / categories. 
`;
