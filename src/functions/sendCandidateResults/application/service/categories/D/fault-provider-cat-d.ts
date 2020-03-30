import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { Fault, FaultLimit } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { SafetyQuestionResult, PcvDoorExercise } from '@dvsa/mes-test-schema/categories/D/partial';

export const getDrivingFaultsCatD = (testData: CatDUniqueTypes.TestData | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  getNonStandardFaultsCatD(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  return drivingFaults;
};

export const getSeriousFaultsCatD = (testData: CatDUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  getNonStandardFaultsCatD(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  if (getVehicleCheckFaultCount(
    testData.vehicleChecks as CatDUniqueTypes.VehicleChecks, CompetencyOutcome.DF) === FaultLimit.NON_TRAILER) {
    seriousFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return seriousFaults;
};

const getVehicleCheckFaultCount = (
  vehicleChecks: CatDUniqueTypes.VehicleChecks,
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

export const getDangerousFaultsCatD = (testData: CatDUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatD(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatD = (
  testData: CatDUniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFaultCatD(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  // Safety Questions
  if (testData.safetyQuestions &&
    testData.safetyQuestions.questions) {
    getSafetyQuestionsFaultCatD(testData.safetyQuestions.questions, faultType)
    .forEach(fault => faults.push(fault));
  }

// Pcv Door Exercise
  if (testData.pcvDoorExercise) {
    getPcvDoorExerciseFaultCatD(testData.pcvDoorExercise, faultType)
    .forEach(fault => faults.push(fault));
  }

  return faults;
};

export const getVehicleChecksFaultCatD = (
  vehicleChecks: CatDUniqueTypes.VehicleChecks,
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

export const getSafetyQuestionsFaultCatD = (
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

export const getPcvDoorExerciseFaultCatD = (
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
