export enum BooleanText {
  YES = 'yes',
  NO = 'no',
}

export interface Personalisation {
  firstName: string;
  lastName: string;
  applicationReference: number;
  category: string;
  date: string;
  driverNumber:string;
  location: string;

  drivingFaults: string[];
  seriousFaults: string[];
  dangerousFaults: string[];

  showDrivingFaults: BooleanText;
  showSeriousFaults: BooleanText;
  showDangerousFaults: BooleanText;
  showEcoText: BooleanText;
}

export interface EmailPersonalisation extends Personalisation {

}

export interface LetterPersonalisation extends Personalisation {
  'address_line_1' : string;
  'address_line_2' : string;
  'address_line_3' ? : string;
  'address_line_4' ? : string;
  'address_line_5' ? : string;
  'address_line_6' ? : string;
  'postcode' : string;
}
