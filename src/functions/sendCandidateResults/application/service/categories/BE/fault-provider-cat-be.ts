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
import { KinesisVideoArchivedMedia } from 'aws-sdk';

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

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatBEUniqueTypes.VehicleChecks, 'DF') === 5) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }
  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    seriousFaults.push({ name: Competencies.eyesightTest, count: 1 });
  }

  return seriousFaults;
};

const getVehicleCheckFaultCount = (
  vehicleChecks: CatBEUniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): number => {
  let questionCount = 0;

  if (vehicleChecks) {
    if (vehicleChecks.showMeQuestions) {
      questionCount = questionCount +
         vehicleChecks.showMeQuestions.filter((showMe) => { return showMe.outcome === faultType; }).length;
    }
    if (vehicleChecks.tellMeQuestions) {
      questionCount = questionCount +
         vehicleChecks.tellMeQuestions.filter((tellMe) => { return tellMe.outcome === faultType; }).length;
    }
  }
  return questionCount;
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

  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);
  if (faultCount > 0) {
    faultArray.push({ name: Competencies.vehicleChecks, count: faultCount });
  }
  return faultArray;
};
