import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { Fault, vehicleCheckDrivingFaultLimit } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';

export const getDrivingFaultsCatD1 = (testData: CatD1UniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatD1(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatD1 = (testData: CatD1UniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatD1(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (getVehicleCheckFaultCount(
    testData.vehicleChecks as CatD1UniqueTypes.VehicleChecks, CompetencyOutcome.DF) === vehicleCheckDrivingFaultLimit) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
};

const getVehicleCheckFaultCount = (
  vehicleChecks: CatD1UniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): number => {
  let questionCount: number = 0;

  if (!vehicleChecks) {
    return questionCount;
  }

  if (vehicleChecks.showMeQuestions) {
    questionCount = questionCount +
      vehicleChecks.showMeQuestions.filter((showMe: QuestionResult) => showMe.outcome === faultType).length;
  }
  if (vehicleChecks.tellMeQuestions) {
    questionCount = questionCount +
      vehicleChecks.tellMeQuestions.filter((tellMe: QuestionResult) => tellMe.outcome === faultType).length;
  }
  return questionCount;
};

export const getDangerousFaultsCatD1 = (testData: CatD1UniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatD1(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatD1 = (
  testData: CatD1UniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatD1(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatD1 = (
  vehicleChecks: CatD1UniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): Fault[] => {
  const faultArray: Fault[] = [];
  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);

  if (faultCount > 0) {
    faultArray.push(
      { name: Competencies.vehicleChecks, count: faultCount === vehicleCheckDrivingFaultLimit ? 4 : faultCount },
    );
  }
  return faultArray;
};
