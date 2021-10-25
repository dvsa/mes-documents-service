import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

export const getDangerousFaultsCatB = (testData: CatBUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatB(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getSeriousFaultsCatB = (testData: CatBUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatB(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    seriousFaults.push({ name: Competencies.eyesightTest, count: 1 });
  }

  return seriousFaults;
};

export const getDrivingFaultsCatB = (testData: CatBUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatB(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getNonStandardFaultsCatB = (testData: CatBUniqueTypes.TestData, faultType: CompetencyOutcome): Fault[] => {
  const faults: Fault[] = [];

  // Controlled Stop
  if (
    testData.controlledStop &&
    testData.controlledStop.selected &&
    testData.controlledStop.fault === faultType) {
    faults.push({ name: Competencies.controlledStop, count: 1 });
  }

  // Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

  // Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatB(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatB = (vehicleChecks: CatBUniqueTypes.VehicleChecks,
                                          faultType: QuestionOutcome): Fault[] => {
  if (faultType === CompetencyOutcome.D) {
    if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D) {
      return [{ name: Competencies.vehicleChecks, count: 1 }];
    }
  }

  if (faultType === CompetencyOutcome.S) {
    if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) {
      return [{ name: Competencies.vehicleChecks, count: 1 }];
    }
  }

  if (faultType === CompetencyOutcome.DF) {
    if (vehicleChecks.showMeQuestion && (
      vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S ||
      vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D)
    ) {
      return [];
    }

    if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF) {
      return [{ name: Competencies.vehicleChecks, count: 1 }];
    }

    if (vehicleChecks.tellMeQuestion && vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF) {
      return [{ name: Competencies.vehicleChecks, count: 1 }];
    }
  }
  return [];
};
