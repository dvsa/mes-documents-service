
export interface EmailAttributes {
  refNumber: string;
  testDate: string;
  testTime: string;
  firstName: string;
}

export interface LetterAttributes {
  address: Address;
  refNumber: string;
  testDate: string;
  testTime: string;
  firstName: string;
}

export type Address = {
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  addressLine4: string,
  addressLine5: string,
  postcode: string,
};

export class NotifyClientStub {

  constructor(private apiKey: string) {

  }

  sendEmail(templateId: string, emailAddress: string, emailAttributes: EmailAttributes): Promise<any> {
    console.log('Send Email');

    console.log('templateId', templateId);
    console.log('emailAddress', emailAddress);
    console.log('emailAttributes', emailAttributes);

    return new Promise((resolve) => {
      resolve({ data: 'email sent successfully' });
    });
  }

  sendLetter(templateId: string, letterAttributes: LetterAttributes): Promise<any> {
    console.log('Send Letter');

    console.log('templateId', templateId);
    console.log('letterAttributes', letterAttributes);

    return new Promise((resolve) => {
      resolve({ data: 'letter sent successfully' });
    });
  }

}
