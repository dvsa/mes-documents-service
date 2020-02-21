import { TestData as CatAMod1TestData, EmergencyStop, Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import { CustomProperties } from '../../../../domain/custom-properties';
import { get } from 'lodash';
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
  emergencyStopData: EmergencyStop | undefined,
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

  if (!emergencyStopData) {
    return emergencyStopAttempts;
  }

  if (get(emergencyStopData, 'firstAttempt') !== undefined) {
    emergencyStopAttempts.showEmergencyStop = BooleanText.YES;
    emergencyStopAttempts.showEmergencyFirstAttempt = BooleanText.YES;
    emergencyStopAttempts.emergencyFirstAttempt =
      emergencyStopData.firstAttempt === 0 ? 'Aborted attempt' : `${emergencyStopData.firstAttempt} km/h`;
  }

  if (get(emergencyStopData, 'secondAttempt') !== undefined) {
    emergencyStopAttempts.showEmergencySecondAttempt = BooleanText.YES;
    emergencyStopAttempts.emergencySecondAttempt = `${emergencyStopData.secondAttempt} km/h`;
  }

  return emergencyStopAttempts;
};

const getAvoidanceAttempts = (
  avoidanceData: Avoidance | undefined,
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

  if (!avoidanceData) {
    return avoidanceAttempts;
  }

  if (get(avoidanceData, 'firstAttempt') !== undefined) {
    avoidanceAttempts.showAvoidanceExercise = BooleanText.YES;
    avoidanceAttempts.showAvoidanceFirstAttempt = BooleanText.YES;
    avoidanceAttempts.avoidanceFirstAttempt =
      avoidanceData.firstAttempt === 0 ? 'Aborted attempt' : `${avoidanceData.firstAttempt} km/h`;
  }

  if (get(avoidanceData, 'secondAttempt') !== undefined) {
    avoidanceAttempts.showAvoidanceSecondAttempt = BooleanText.YES;
    avoidanceAttempts.avoidanceSecondAttempt = `${avoidanceData.secondAttempt} km/h`;
  }

  return avoidanceAttempts;
};
