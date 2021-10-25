import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { get } from 'lodash';

import { Fault } from '../../../../domain/fault';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import {
  convertBooleanFaultObjectToArray,
  convertNumericFaultObjectToArray,
  getCompletedManoeuvres,
  getVehicleCheckFaultCount,
  HomeTestDataUnion,
} from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';

type HCodeSafetyFault = 'drivingFault' | 'seriousFault';
export type ControlledStopHomeTestUnion = CatFUniqueTypes.ControlledStop
| CatGUniqueTypes.ControlledStop
| CatHUniqueTypes.ControlledStop
| CatKUniqueTypes.ControlledStop;

export const getDrivingFaultsCatHome = (testData: HomeTestDataUnion | undefined): Fault [] => {
  const drivingFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(fault => drivingFaults.push(fault));
  }

  if (hasHighwayCodeSafetyFault(testData, 'drivingFault')) {
    drivingFaults.push({ name: Competencies.highwayCodeSafety, count: 1 });
  }

  getNonStandardFaultsCatHome(testData, CompetencyOutcome.DF)
    .forEach((fault: Fault) => drivingFaults.push(fault));

  getControlledStopFaultsCatHome(testData.controlledStop as ControlledStopHomeTestUnion, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));

  if (getVehicleCheckFaultCount(testData.vehicleChecks as CatFUniqueTypes.VehicleChecks, CompetencyOutcome.DF) >= 1) {
    drivingFaults.push({ name: Competencies.vehicleChecks, count: 1 });
  }

  return drivingFaults;
};

export const getSeriousFaultsCatHome = (testData: HomeTestDataUnion | undefined): Fault [] => {
  const seriousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(fault => seriousFaults.push(fault));
  }

  if (hasHighwayCodeSafetyFault(testData, 'seriousFault')) {
    seriousFaults.push({ name: Competencies.highwayCodeSafety, count: 1 });
  }

  getNonStandardFaultsCatHome(testData, CompetencyOutcome.S)
    .forEach((fault: Fault) => seriousFaults.push(fault));

  getControlledStopFaultsCatHome(testData.controlledStop as ControlledStopHomeTestUnion, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));

  // eyesight test
  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    seriousFaults.push({ name: Competencies.eyesightTest, count: 1 });
  }

  return seriousFaults;
};

export const getDangerousFaultsCatHome = (testData: HomeTestDataUnion | undefined): Fault [] => {
  const dangerousFaults: Fault[] = [];

  if (!testData) {
    throw new Error('No Test Data');
  }

  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(fault => dangerousFaults.push(fault));
  }

  getNonStandardFaultsCatHome(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  getControlledStopFaultsCatHome(testData.controlledStop as ControlledStopHomeTestUnion, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));

  return dangerousFaults;
};

export const getControlledStopFaultsCatHome = (controlledStop: ControlledStopHomeTestUnion,
                                               faultType: QuestionOutcome): Fault[] => {
  return (controlledStop.fault === faultType) ? [{ name: Competencies.controlledStop, count: 1 }] : [];
};

export const getNonStandardFaultsCatHome = (
  testData: CatFUniqueTypes.TestData | CatGUniqueTypes.TestData | CatHUniqueTypes.TestData,
  faultType: CompetencyOutcome): Fault[] => {

  const faults: Fault[] = [];

  // Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

  return faults;
};

const hasHighwayCodeSafetyFault = (
  testData: HomeTestDataUnion | undefined, faultType: HCodeSafetyFault): boolean => {

  const isFault: boolean = get(testData, `highwayCodeSafety.${faultType}`, false);
  const isSelected: boolean = get(testData, 'highwayCodeSafety.selected', false);

  if (isFault && isSelected) {
    return true;
  }
  return false;
};
