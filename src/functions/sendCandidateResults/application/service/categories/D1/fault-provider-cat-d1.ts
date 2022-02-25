import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
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
import { SafetyQuestionResult, PcvDoorExercise } from '@dvsa/mes-test-schema/categories/D1/partial';

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
    testData.vehicleChecks as CatD1UniqueTypes.VehicleChecks, CompetencyOutcome.DF) === FaultLimit.NON_TRAILER) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
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

  // Safety Questions
  if (testData.safetyQuestions &&
      testData.safetyQuestions.questions) {
    getSafetyQuestionsFaultCatD1(testData.safetyQuestions.questions, faultType)
      .forEach(fault => faults.push(fault));
  }

  // Pcv Door Exercise
  if (testData.pcvDoorExercise) {
    getPcvDoorExerciseFaultCatD1(testData.pcvDoorExercise, faultType)
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
      { name: Competencies.vehicleChecks, count: faultCount === FaultLimit.NON_TRAILER ? 4 : faultCount },
    );
  }
  return faultArray;
};
export const getSafetyQuestionsFaultCatD1 = (
  safetyQuestions: SafetyQuestionResult[],
  faultType: QuestionOutcome): Fault[] => {
  const faultArray: Fault[] = [];

  if (!safetyQuestions || safetyQuestions.length === 0) {
    return faultArray;
  }

  if (faultType !== CompetencyOutcome.DF) {
    return faultArray;
  }
  let gotFault: boolean = false;

  safetyQuestions.forEach((question) => {
    if (question.outcome === CompetencyOutcome.DF) {
      gotFault = true;
    }
  });
  if (gotFault) {
    faultArray.push(
      { name: Competencies.safetyQuestions, count: 1 },
    );
  }
  return faultArray;
};

export const getPcvDoorExerciseFaultCatD1 = (
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
