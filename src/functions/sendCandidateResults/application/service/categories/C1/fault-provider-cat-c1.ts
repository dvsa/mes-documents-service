import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';

export const getDrivingFaultsCatC1 = (testData: CatC1UniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatC1(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatC1 = (testData: CatC1UniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatC1(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatC1UniqueTypes.VehicleChecks, CompetencyOutcome.DF) === 5) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
};

const getVehicleCheckFaultCount = (
  vehicleChecks: CatC1UniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): number => {
  let questionCount: number = 0;

  if (vehicleChecks) {
    if (vehicleChecks.showMeQuestions) {
      questionCount = questionCount +
        vehicleChecks.showMeQuestions.filter((showMe: QuestionResult) => showMe.outcome === faultType).length;
    }
    if (vehicleChecks.tellMeQuestions) {
      questionCount = questionCount +
        vehicleChecks.tellMeQuestions.filter((tellMe: QuestionResult) => tellMe.outcome === faultType).length;
    }
  }
  return questionCount;
};

export const getDangerousFaultsCatC1 = (testData: CatC1UniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatC1(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatC1 = (
  testData: CatC1UniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatC1(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatC1 = (
  vehicleChecks: CatC1UniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): Fault[] => {
  const faultArray: Fault[] = [];
  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);

  if (faultCount > 0) {
    faultArray.push({ name: Competencies.vehicleChecks, count: faultCount === 5 ? 4 : faultCount });
  }
  return faultArray;
};
