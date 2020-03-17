import {
  TestData as CatAMod2TestData,
  SafetyAndBalanceQuestions,
} from '@dvsa/mes-test-schema/categories/AM2';
import { convertNumericFaultObjectToArray, convertBooleanFaultObjectToArray } from '../../fault-provider';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import { Competencies } from '../../../../domain/competencies';

export const getDrivingFaultsCatAMod2 = (testData: CatAMod2TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  return [
    ...convertNumericFaultObjectToArray(testData.drivingFaults),
    ...getSafetyAndBalanceFaultCatAMod2(testData.safetyAndBalanceQuestions),
  ];
};

export const getSeriousFaultsCatAMod2 = (testData: CatAMod2TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  return [
    ...convertBooleanFaultObjectToArray(testData.seriousFaults),
  ];
};

export const getDangerousFaultsCatAMod2 = (testData: CatAMod2TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  return [
    ...convertBooleanFaultObjectToArray(testData.dangerousFaults),
  ];
};

export const getSafetyAndBalanceFaultCatAMod2 = (
  safetyAndBalanceQuestions: SafetyAndBalanceQuestions | undefined,
): Fault[] => {
  const faultArray: Fault[] = [];

  if (hasQuestionFault(safetyAndBalanceQuestions)) {
    faultArray.push(
      { name: Competencies.safetyAndBalance, count: 1 },
    );
  }
  return faultArray;
};

export const hasQuestionFault = (
  safetyAndBalanceQuestions: SafetyAndBalanceQuestions | undefined,
): boolean => {
  let balanceFault = false;
  let safetyFault = false;

  if (safetyAndBalanceQuestions) {
    if (safetyAndBalanceQuestions.balanceQuestions) {
      balanceFault = safetyAndBalanceQuestions.balanceQuestions.some(e => e.outcome === CompetencyOutcome.DF);
    }

    if (safetyAndBalanceQuestions.safetyQuestions) {
      safetyFault = safetyAndBalanceQuestions.safetyQuestions.some(e => e.outcome === CompetencyOutcome.DF);
    }
  }

  if (balanceFault || safetyFault) {
    return true;
  }

  return false;
};
