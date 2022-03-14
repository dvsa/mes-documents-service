import {CatCEMUniqueTypes} from '@dvsa/mes-test-schema/categories/CEM';
import {Fault} from '../../../../domain/fault';
import {CompetencyOutcome} from '../../../../domain/competency-outcome';
import {
  getCompletedManoeuvres,
} from '../../fault-provider';
import {Competencies} from '../../../../domain/competencies';

export const getSeriousFaultsCatManoeuvre = (testData: CatCEMUniqueTypes.TestData | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  getNonStandardFaultsCatManoeuvre(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  return seriousFaults;
};

export const getDangerousFaultsCatManoeuvre = (testData: CatCEMUniqueTypes.TestData | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  getNonStandardFaultsCatManoeuvre(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getNonStandardFaultsCatManoeuvre = (
  testData: CatCEMUniqueTypes.TestData,
  faultType: CompetencyOutcome,
): Fault[] => {

  const faults: Fault[] = [];

  // Uncouple / recouple
  if (
    testData.uncoupleRecouple &&
    testData.uncoupleRecouple.selected &&
    testData.uncoupleRecouple.fault === faultType) {
    faults.push({name: Competencies.uncoupleRecouple, count: 1});
  }

  // Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};
