export enum BooleanText {
  YES = 'yes',
  NO = 'no',
}

export interface Personalisation {
  firstName: string;
  lastName: string;
  category: string;
  date: string;
  driverNumber:string;
  location: string;

  drivingFaults: string[] | string;
  showDrivingFaults: BooleanText;

  seriousFaults: string[] | string;
  showSeriousFaults: BooleanText;

  dangerousFaults: string[] | string;
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
