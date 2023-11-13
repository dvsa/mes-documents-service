import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
  getVehicleCheckFaultCount,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { getVehicleCheckFaultLimit } from '../C/fault-provider-cat-c';

type CatCETestData = CatCEUniqueTypes.TestData | CatC1EUniqueTypes.TestData | undefined;

export const getDrivingFaultsCatCE = (testData: CatCETestData): Fault [] => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const drivingFaults: Fault[] = [];

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatCE(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatCE = (testData: CatCETestData): Fault [] => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const seriousFaults: Fault[] = [];

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatCE(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  const faultLimit = getVehicleCheckFaultLimit(testData.vehicleChecks as CatCEUniqueTypes.VehicleChecks);

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatCEUniqueTypes.VehicleChecks, CompetencyOutcome.DF) ===
    faultLimit) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
};

export const getDangerousFaultsCatCE = (testData: CatCETestData): Fault [] => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const dangerousFaults: Fault[] = [];

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatCE(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatCE = (
  testData: Exclude<CatCETestData, undefined>,
  faultType: CompetencyOutcome,
): Fault[] => {

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
    getVehicleChecksFaultCatCE(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatCE = (
  vehicleChecks: CatCEUniqueTypes.VehicleChecks | CatC1EUniqueTypes.VehicleChecks,
  faultType: QuestionOutcome,
): Fault[] => {
  const faultArray: Fault[] = [];
  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);

  if (faultCount > 0) {
    const faultLimit = getVehicleCheckFaultLimit(vehicleChecks);

    faultArray.push(
      { name: Competencies.vehicleChecks, count: (faultCount === faultLimit) ? (faultCount - 1) : faultCount },
    );
  }
  return faultArray;
};
