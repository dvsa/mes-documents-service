import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
  getVehicleCheckFaultCount,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';

export const getDrivingFaultsCatF = (testData: CatFUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatF(testData, CompetencyOutcome.DF)
    .forEach((fault: Fault) => drivingFaults.push(fault));

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatFUniqueTypes.VehicleChecks, CompetencyOutcome.DF) >= 1) {
    drivingFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return drivingFaults;
};

export const getSeriousFaultsCatF = (testData: CatFUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatF(testData, CompetencyOutcome.S)
    .forEach((fault: Fault) => seriousFaults.push(fault));

  return seriousFaults;
};

export const getDangerousFaultsCatF = (testData: CatFUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatF(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatF = (
  testData: CatFUniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};
