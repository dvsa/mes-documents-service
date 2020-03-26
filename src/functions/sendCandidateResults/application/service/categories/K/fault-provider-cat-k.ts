import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';
import { QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';

export const getDrivingFaultsCatK = (testData: CatKUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatK(testData, CompetencyOutcome.DF)
    .forEach((fault: Fault) => drivingFaults.push(fault));

  const faultCount: number =
    getVehicleCheckFaultCount(testData.vehicleChecks as CatKUniqueTypes.VehicleChecks, CompetencyOutcome.DF);

  if (faultCount === 1 || faultCount === 2) {
    drivingFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return drivingFaults;
};

export const getSeriousFaultsCatK = (testData: CatKUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatK(testData, CompetencyOutcome.S)
    .forEach((fault: Fault) => seriousFaults.push(fault));

  return seriousFaults;
};

export const getDangerousFaultsCatK = (testData: CatKUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatK(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatK = (
  testData: CatKUniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatK(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatK = (
  vehicleChecks: CatKUniqueTypes.VehicleChecks,
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
  vehicleChecks: CatKUniqueTypes.VehicleChecks,
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
