export const drivingEnglishSubject = `
Your driving test result on {{ date }} – Driving test reference number: {{ applicationReference }}
`;

export const drivingWelshSubject = `
Canlyniad eich prawf gyrru ar {{ date }} - Cyfeirnod prawf gyrru: {{ applicationReference }}
`;

export const ridingEnglishSubject = `
Your motorcycle test result on {{ date }} – Motorcycle test reference number: {{ applicationReference }}
`;

export const ridingWelshSubject = `
Canlyniad eich prawf Beic Modur ar {{ date }} - Cyfeirnod y prawf Beic Modur: {{ applicationReference }}
`;

export const adiEnglishSubject = `
Your {{ categoryDescriptor }} test result on {{ date }} – Test reference number: {{ applicationReference }}
`;

export const adiWelshSubject = `
Canlyniad eich prawf {{ categoryDescriptor }} ar {{ date }} – Cyfeirnod prawf gyrru: {{ applicationReference }}
`;

export const padiEnglishSubject = `
{{#if isADI3}}ADI Part 3 – 3rd Attempt Fail{{/if}}{{#if isSC}}ADI SC – 3rd Attempt Fail{{/if}}
`;

export const padiWelshSubject = `
${padiEnglishSubject}
`;

export const cpcEnglishSubject = `
Your test result on {{ date }} – CPC Module 4 reference number: {{ applicationReference }}
`;

export const cpcWelshSubject = `
Canlyniad eich prawf ar {{ date }} – CPC Modiwl 4 rhif cyfeirnod: {{ applicationReference }}
`;
