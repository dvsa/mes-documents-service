import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

// export enum BooleanText {
//   YES = 'yes',
//   NO = 'no',
// }

export enum PositionText {
  IN = 'in',
  ON = 'on',
}

export interface Personalisation {
  applicationReference: number;
  category: TestCategory;
  date: string;
  location: string;

  drivingFaults: string[] | string;
  showDrivingFaults: boolean;

  seriousFaults: string[] | string;
  showSeriousFaults: boolean;

  dangerousFaults: string[] | string;
  showDangerousFaults: boolean;

  showEcoText: boolean;

  showEtaText: boolean;
  showEtaVerbal: boolean;
  showEtaPhysical: boolean;

  showProvLicenceRetainedByDvsa: boolean;
  showProvLicenceRetainedByDriver: boolean;
}

export interface PersonalisationDetails extends Personalisation {
  candidateName: string;
  'address_line_1' : string;
  'address_line_2' : string;
  'address_line_3' ? : string;
  'address_line_4' ? : string;
  'address_line_5' ? : string;
  'address_line_6' ? : string;
  'postcode' : string;
}

export interface Address {
  'address_line_1' : string;
  'address_line_2' : string;
  'address_line_3' ? : string;
  'address_line_4' ? : string;
  'address_line_5' ? : string;
  'address_line_6' ? : string;
  'postcode' : string;
}
