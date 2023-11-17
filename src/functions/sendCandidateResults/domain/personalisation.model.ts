import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export enum BooleanText {
  YES = 'yes',
  NO = 'no',
}

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

export interface EmailPersonalisation extends Personalisation {
  candidateName: string;
}

export interface CatAMod1Personalisation extends EmailPersonalisation {
  showEmergencyStop: BooleanText;
  showEmergencyFirstAttempt: BooleanText;
  emergencyFirstAttempt: string;
  showEmergencySecondAttempt: BooleanText;
  emergencySecondAttempt: string;
  showAvoidanceExercise: BooleanText;
  showAvoidanceFirstAttempt: BooleanText;
  avoidanceFirstAttempt: string;
  showAvoidanceSecondAttempt: BooleanText;
  avoidanceSecondAttempt: string;
}

export interface CatCPCPersonalisation extends EmailPersonalisation {
  q1Score: string;
  q2Score: string;
  q3Score: string;
  q4Score: string;
  q5Score: string;
  totalScore: string;
  showLGVText: BooleanText;
  showPCVText: BooleanText;
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

export interface Address {
  'address_line_1' : string;
  'address_line_2' : string;
  'address_line_3' ? : string;
  'address_line_4' ? : string;
  'address_line_5' ? : string;
  'address_line_6' ? : string;
  'postcode' : string;
}
