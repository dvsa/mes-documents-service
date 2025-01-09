import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { Fault, FaultLimit } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
  getVehicleCheckFaultCount,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { get } from 'lodash';

type CatCTestData = CatCUniqueTypes.TestData | CatC1UniqueTypes.TestData | undefined;

export const getDrivingFaultsCatC = (testData: CatCTestData): Fault [] => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const drivingFaults: Fault[] = [];

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatC(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatC = (testData: CatCTestData): Fault [] => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const seriousFaults: Fault[] = [];

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatC(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatCUniqueTypes.VehicleChecks, CompetencyOutcome.DF) ===
    FaultLimit.NON_TRAILER) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
};

export const getDangerousFaultsCatC = (testData: CatCTestData): Fault [] => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const dangerousFaults: Fault[] = [];

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatC(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatC = (
  testData: Exclude<CatCTestData, undefined>,
  faultType: CompetencyOutcome,
): Fault[] => {

  const faults: Fault[] = [];

  // Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

  // Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatC(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatC = (
  vehicleChecks: CatCUniqueTypes.VehicleChecks | CatC1UniqueTypes.VehicleChecks,
  faultType: QuestionOutcome
): Fault[] => {
  const faultArray: Fault[] = [];
  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);

  if (faultCount > 0) {
    faultArray.push(
      { name: Competencies.vehicleChecks, count: faultCount === FaultLimit.NON_TRAILER ? 4 : faultCount },
    );
  }
  return faultArray;
};

export const getVehicleCheckFaultLimit = (vehicleChecks: CatCUniqueTypes.VehicleChecks): FaultLimit => {
  const fullLicenceHeld: boolean = get(vehicleChecks, 'fullLicenceHeld', false);

  return fullLicenceHeld ? FaultLimit.TRAILER : FaultLimit.NON_TRAILER;
};
