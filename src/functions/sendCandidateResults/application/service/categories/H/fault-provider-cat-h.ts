import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres, getVehicleCheckFaultCount,
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

  return faults;
};
