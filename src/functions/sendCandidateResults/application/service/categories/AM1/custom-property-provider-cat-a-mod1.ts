import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import {
  BooleanText,
} from '../../../../domain/personalisation.model';

export const getCustomPropertiesCatAMod1 = (testData: CatAMod1TestData | undefined): any => {
  return {
    ...getEmergencyStopAttempts(testData),
    ...getAvoidanceAttempts(testData),
  };
};

const getEmergencyStopAttempts = (testData: CatAMod1TestData | undefined): any => {
  const emergencyStopAttempts = {
    showEmergencyStop: BooleanText.NO,
    showEmergencyFirstAttempt: BooleanText.NO,
    emergencyFirstAttempt: '',
    showEmergencySecondAttempt: BooleanText.NO,
    emergencySecondAttempt: '',
  };

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (!!testData.emergencyStop) {
    if (!!testData.emergencyStop.firstAttempt && typeof testData.emergencyStop.firstAttempt === 'number') {
      emergencyStopAttempts.showEmergencyStop = BooleanText.YES;
      emergencyStopAttempts.showEmergencyFirstAttempt = BooleanText.YES;
      emergencyStopAttempts.emergencyFirstAttempt = testData.emergencyStop.firstAttempt.toString();
    }

    if (!!testData.emergencyStop.secondAttempt && typeof testData.emergencyStop.firstAttempt === 'number') {
      emergencyStopAttempts.showEmergencySecondAttempt = BooleanText.YES;
      emergencyStopAttempts.emergencySecondAttempt = testData.emergencyStop.secondAttempt.toString();
    }
  }

  return emergencyStopAttempts;
};

const getAvoidanceAttempts = (testData: CatAMod1TestData | undefined): any => {
  const avoidanceAttempts = {
    showAvoidanceExercise: BooleanText.NO,
    showAvoidanceFirstAttempt: BooleanText.NO,
    avoidanceFirstAttempt: '',
    showAvoidanceSecondAttempt: BooleanText.NO,
    avoidanceSecondAttempt: '',
  };

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (!!testData.avoidance) {
    if (!!testData.avoidance.firstAttempt && typeof testData.avoidance.firstAttempt === 'number') {
      avoidanceAttempts.showAvoidanceExercise = BooleanText.YES;
      avoidanceAttempts.showAvoidanceFirstAttempt = BooleanText.YES;
      avoidanceAttempts.avoidanceFirstAttempt = testData.avoidance.firstAttempt.toString();
    }

    if (!!testData.avoidance.secondAttempt && typeof testData.avoidance.firstAttempt === 'number') {
      avoidanceAttempts.showAvoidanceSecondAttempt = BooleanText.YES;
      avoidanceAttempts.avoidanceSecondAttempt = testData.avoidance.secondAttempt.toString();
    }
  }

  return avoidanceAttempts;
};
