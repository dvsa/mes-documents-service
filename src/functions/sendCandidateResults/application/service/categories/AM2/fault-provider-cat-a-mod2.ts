import {
  TestData as CatAMod2TestData,
  SafetyAndBalanceQuestions,
} from '@dvsa/mes-test-schema/categories/AM2';
import { convertNumericFaultObjectToArray, convertBooleanFaultObjectToArray } from '../../fault-provider';
import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import { Competencies } from '../../../../domain/competencies';
import { get } from 'lodash';

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

  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  convertBooleanFaultObjectToArray(testData.seriousFaults).forEach(fault => seriousFaults.push(fault));

  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    seriousFaults.push({ name: Competencies.eyesightTest, count: 1 });
  }

  return seriousFaults;
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
  return get(safetyAndBalanceQuestions, 'balanceQuestions', []).some(e => e.outcome === CompetencyOutcome.DF) ||
    get(safetyAndBalanceQuestions, 'safetyQuestions', []).some(e => e.outcome === CompetencyOutcome.DF);
};
