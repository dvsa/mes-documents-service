import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';

export const getDrivingFaultsCatH = (testData: CatHUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatH(testData, CompetencyOutcome.DF)
    .forEach((fault: Fault) => drivingFaults.push(fault));

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatHUniqueTypes.VehicleChecks, CompetencyOutcome.DF) >= 1) {
    drivingFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return drivingFaults;
};

export const getSeriousFaultsCatH = (testData: CatHUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatH(testData, CompetencyOutcome.S)
    .forEach((fault: Fault) => seriousFaults.push(fault));

  return seriousFaults;
};

export const getDangerousFaultsCatH = (testData: CatHUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatH(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatH = (
  testData: CatHUniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatH(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatH = (
  vehicleChecks: CatHUniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): Fault[] => {
  const faultArray: Fault[] = [];
  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);

  if (faultCount > 0) {
    faultArray.push(
      { name: Competencies.vehicleChecks, count: faultCount >= 1 ? 1 : faultCount },
    );
  }
  return faultArray;
};

const getVehicleCheckFaultCount = (
  vehicleChecks: CatHUniqueTypes.VehicleChecks,
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
