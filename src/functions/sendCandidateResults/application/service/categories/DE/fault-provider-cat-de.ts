import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { Fault, FaultLimit } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
  getVehicleCheckFaultCount,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { PcvDoorExercise } from '@dvsa/mes-test-schema/categories/DE/partial';

export const getDrivingFaultsCatDE = (testData: CatDEUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatDE(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatDE = (testData: CatDEUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatDE(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatDEUniqueTypes.VehicleChecks, CompetencyOutcome.DF)
    === FaultLimit.TRAILER) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
};

export const getDangerousFaultsCatDE = (testData: CatDEUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatDE(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatDE = (
  testData: CatDEUniqueTypes.TestData,
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
    getVehicleChecksFaultCatDE(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

// Pcv Door Exercise
  if (testData.pcvDoorExercise) {
    getPcvDoorExerciseFaultCatDE(testData.pcvDoorExercise, faultType)
    .forEach(fault => faults.push(fault));
  }
  return faults;
};

export const getVehicleChecksFaultCatDE = (
  vehicleChecks: CatDEUniqueTypes.VehicleChecks,
  faultType: QuestionOutcome): Fault[] => {
  const faultArray: Fault[] = [];
  const faultCount = getVehicleCheckFaultCount(vehicleChecks, faultType);

  if (faultCount > 0) {
    faultArray.push(
      { name: Competencies.vehicleChecks, count: faultCount === FaultLimit.TRAILER ? 1 : faultCount },
    );
  }
  return faultArray;
};

export const getPcvDoorExerciseFaultCatDE = (
   pcvDoorExercise: PcvDoorExercise,
   faultType: QuestionOutcome): Fault[] => {
  const faultArray: Fault[] = [];

  if (!pcvDoorExercise) {
    return faultArray;
  }

  let gotFault: boolean = false;

  switch (faultType) {
    case CompetencyOutcome.DF:
      gotFault = pcvDoorExercise.drivingFault || false;
      break;
    case CompetencyOutcome.S:
      gotFault = pcvDoorExercise.seriousFault || false;
      break;
    case CompetencyOutcome.D:
      gotFault = pcvDoorExercise.dangerousFault || false;
      break;
  }

  if (gotFault) {
    faultArray.push(
        { name: Competencies.pcvDoorExercise, count: 1 },
      );
  }
  return faultArray;
};
