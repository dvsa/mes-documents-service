import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';

export const getDrivingFaultsCatBE = (testData: CatBEUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatBE(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatBE = (testData: CatBEUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatBE(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    seriousFaults.push({ name: Competencies.eyesightTest, count: 1 });
  }

  return seriousFaults;
};

export const getDangerousFaultsCatBE = (testData: CatBEUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatBE(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatBE = (
  testData: CatBEUniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Uncouple / recouple
  if (
    testData.uncoupleRecouple &&
    testData.uncoupleRecouple.selected &&
    testData.uncoupleRecouple.fault === faultType) {
    faults.push({ name: Competencies.uncoupleRecouple, count: 1 });
  }

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatBE(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatBE = (
  vehicleChecks: CatBEUniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): Fault[] => {

  const faultArray: Fault[] = [];

  if (vehicleChecks.showMeQuestions) {
    vehicleChecks.showMeQuestions.forEach((questionResult: QuestionResult) => {
      if (faultType === 'DF' && (questionResult.outcome === 'S' || questionResult.outcome === 'D')) {
        return [];
      }

      if (faultType === questionResult.outcome) {
        faultArray.push({ name: Competencies.vehicleChecks, count: 1 });
      }
    });
    return faultArray;
  }

  if (vehicleChecks.tellMeQuestions) {
    vehicleChecks.tellMeQuestions.forEach((questionResult: QuestionResult) => {
      if (faultType === 'DF' && (faultType === questionResult.outcome)) {
        faultArray.push({ name: Competencies.vehicleChecks, count: 1 });
      }
    });
    return faultArray;
  }
  return [];
};
