import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { CustomProperties } from '../../../../domain/custom-properties';
import {
  BooleanText,
} from '../../../../domain/personalisation.model';

export interface CatAMod1ICustomProperties extends CustomProperties {
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

export const getCustomPropertiesCatAMod1 = (testData: CatAMod1TestData | undefined): CatAMod1ICustomProperties => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  return {
    ...getEmergencyStopAttempts(testData.emergencyStop),
    ...getAvoidanceAttempts(testData.avoidance),
  };
};

const getEmergencyStopAttempts = (
  emergencyStopData: CatAMod1TestData['emergencyStop'],
): Pick<
  CatAMod1ICustomProperties,
  | 'showEmergencyStop'
  | 'showEmergencyFirstAttempt'
  | 'emergencyFirstAttempt'
  | 'showEmergencySecondAttempt'
  | 'emergencySecondAttempt'
> => {
  const emergencyStopAttempts = {
    showEmergencyStop: BooleanText.NO,
    showEmergencyFirstAttempt: BooleanText.NO,
    emergencyFirstAttempt: '',
    showEmergencySecondAttempt: BooleanText.NO,
    emergencySecondAttempt: '',
  };

  if (!!emergencyStopData) {
    if (
      !!emergencyStopData.firstAttempt &&
      typeof emergencyStopData.firstAttempt === 'number'
    ) {
      emergencyStopAttempts.showEmergencyStop = BooleanText.YES;
      emergencyStopAttempts.showEmergencyFirstAttempt = BooleanText.YES;
      emergencyStopAttempts.emergencyFirstAttempt = emergencyStopData.firstAttempt.toString();
    }

    if (
      !!emergencyStopData.secondAttempt &&
      typeof emergencyStopData.firstAttempt === 'number'
    ) {
      emergencyStopAttempts.showEmergencySecondAttempt = BooleanText.YES;
      emergencyStopAttempts.emergencySecondAttempt = emergencyStopData.secondAttempt.toString();
    }
  }

  return emergencyStopAttempts;
};

const getAvoidanceAttempts = (
  avoidanceData: CatAMod1TestData['avoidance'],
): Pick<
  CatAMod1ICustomProperties,
  | 'showAvoidanceExercise'
  | 'showAvoidanceFirstAttempt'
  | 'avoidanceFirstAttempt'
  | 'showAvoidanceSecondAttempt'
  | 'avoidanceSecondAttempt'
> => {
  const avoidanceAttempts = {
    showAvoidanceExercise: BooleanText.NO,
    showAvoidanceFirstAttempt: BooleanText.NO,
    avoidanceFirstAttempt: '',
    showAvoidanceSecondAttempt: BooleanText.NO,
    avoidanceSecondAttempt: '',
  };

  if (!!avoidanceData) {
    if (!!avoidanceData.firstAttempt && typeof avoidanceData.firstAttempt === 'number') {
      avoidanceAttempts.showAvoidanceExercise = BooleanText.YES;
      avoidanceAttempts.showAvoidanceFirstAttempt = BooleanText.YES;
      avoidanceAttempts.avoidanceFirstAttempt = avoidanceData.firstAttempt.toString();
    }

    if (!!avoidanceData.secondAttempt && typeof avoidanceData.firstAttempt === 'number') {
      avoidanceAttempts.showAvoidanceSecondAttempt = BooleanText.YES;
      avoidanceAttempts.avoidanceSecondAttempt = avoidanceData.secondAttempt.toString();
    }
  }

  return avoidanceAttempts;
};
