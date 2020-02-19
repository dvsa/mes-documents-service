
import {
  TestData as CatAMod1TestData,
  Avoidance,
  SingleFaultCompetencies,
  EmergencyStop,
} from '@dvsa/mes-test-schema/categories/AM1';
import { Fault } from '../../../../domain/fault';
import { convertNumericFaultObjectToArray, convertBooleanFaultObjectToArray } from '../../fault-provider';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import { get, pickBy } from 'lodash';
import { Competencies } from '../../../../domain/competencies';

export const getDrivingFaultsCatAMod1 = (testData: CatAMod1TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  const singleFaultCompetenciesWithDrivingFaults: SingleFaultCompetencies = pickBy(
    testData.singleFaultCompetencies, val => val === CompetencyOutcome.DF,
  );

  return [
    ...convertNumericFaultObjectToArray(testData.drivingFaults),
    ...getSingleFaultCompetencyFaults(singleFaultCompetenciesWithDrivingFaults, CompetencyOutcome.DF),
    ...getAvoidanceFaults(testData.avoidance, CompetencyOutcome.DF),
    ...getEmergencyStopFaults(testData.emergencyStop, CompetencyOutcome.DF),
  ];
};

export const getSeriousFaultsCatAMod1 = (testData: CatAMod1TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  const singleFaultCompetenciesWithSeriousFaults: SingleFaultCompetencies = pickBy(
    testData.singleFaultCompetencies, val => val === CompetencyOutcome.S,
  );

  return [
    ...convertBooleanFaultObjectToArray(testData.seriousFaults),
    ...getSingleFaultCompetencyFaults(singleFaultCompetenciesWithSeriousFaults, CompetencyOutcome.S),
    ...getAvoidanceFaults(testData.avoidance, CompetencyOutcome.S),
    ...getEmergencyStopFaults(testData.emergencyStop, CompetencyOutcome.S),
    ...getSpeedCheckAvoidance(testData.emergencyStop),
    ...getSpeedCheckEmergencyStop(testData.emergencyStop),
  ];
};

export const getDangerousFaultsCatAMod1 = (testData: CatAMod1TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  const singleFaultCompetenciesWithDangerousFaults: SingleFaultCompetencies = pickBy(
    testData.singleFaultCompetencies, val => val === CompetencyOutcome.S,
  );

  return [
    ...convertBooleanFaultObjectToArray(testData.dangerousFaults),
    ...getSingleFaultCompetencyFaults(singleFaultCompetenciesWithDangerousFaults, CompetencyOutcome.D),
    ...getAvoidanceFaults(testData.avoidance, CompetencyOutcome.D),
    ...getEmergencyStopFaults(testData.emergencyStop, CompetencyOutcome.D),
  ];
};

export const getSingleFaultCompetencyFaults = (
  singleFaultCompetencies: SingleFaultCompetencies | undefined, outcome: CompetencyOutcome): Fault[] => {

  if (!singleFaultCompetencies) {
    throw new Error('No Single Fault Competencies');
  }

  return [
    ...getSingleFaultCompetencyFault(singleFaultCompetencies, 'controlledStop', outcome),
    ...getSingleFaultCompetencyFault(singleFaultCompetencies, 'useOfStand', outcome),
    ...getSingleFaultCompetencyFault(singleFaultCompetencies, 'manualHandling', outcome),
    ...getSingleFaultCompetencyFault(singleFaultCompetencies, 'slalom', outcome),
    ...getSingleFaultCompetencyFault(singleFaultCompetencies, 'slowControl', outcome),
    ...getSingleFaultCompetencyFault(singleFaultCompetencies, 'uTurn', outcome),
  ];
};

export const getSingleFaultCompetencyFault = (
  competencies: SingleFaultCompetencies, competencyName: string, outcome: CompetencyOutcome): Fault[] => {
  if (get(competencies, competencyName) === outcome) {
    return [{
      name: (Competencies as any)[competencyName],
      count: 1,
    }];
  }

  return [];
};

export const getAvoidanceFaults = (
  avoidance: Avoidance | undefined, outcome: CompetencyOutcome): Fault[] => {
  if (!avoidance) {
    throw new Error('No Avoidance');
  }

  if (get(avoidance, 'outcome') === outcome) {
    return [{
      name: Competencies.speedCheckAvoidance,
      count: 1,
    }] as Fault[];
  }

  return [];
};

export const getEmergencyStopFaults = (
  emergencyStop: EmergencyStop | undefined, outcome: CompetencyOutcome): Fault[] => {
  if (!emergencyStop) {
    throw new Error('No Emergency Stop');
  }

  if (get(emergencyStop, 'outcome') === outcome) {
    return [{
      name: Competencies.speedCheckEmergencyStop,
      count: 1,
    }] as Fault[];
  }

  return [];
};

export const getSpeedCheckAvoidance = (avoidance: Avoidance | undefined): Fault[] => {
  if (!avoidance) {
    throw new Error('No Avoidance');
  }

  const result: Fault[] = [];
  if (get(avoidance, 'speedNotMetSeriousFault')) {
    result.push({
      name: Competencies.speedCheckAvoidance,
      count: 1,
    });
  }

  return result;
};

export const getSpeedCheckEmergencyStop = (emergencyStop: EmergencyStop | undefined): Fault[] => {
  if (!emergencyStop) {
    throw new Error('No Emergency Stop');
  }

  const result: Fault[] = [];
  if (get(emergencyStop, 'speedNotMetSeriousFault')) {
    result.push({
      name: Competencies.speedCheckEmergencyStop,
      count: 1,
    });
  }

  return result;
};
