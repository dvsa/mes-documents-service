import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { Fault } from '../../../../domain/fault';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { convertBooleanFaultObjectToArray, convertNumericFaultObjectToArray } from '../../fault-provider';
import { Competencies } from '../../../../domain/competencies';
import { CompetencyOutcome } from '../../../../domain/competency-outcome';
import ControlledStop = CatADI2UniqueTypes.ControlledStop;
import Manoeuvres = CatADI2UniqueTypes.Manoeuvres;

export const getDrivingFaultsCatADI2 = (testData: CatADI2UniqueTypes.TestData): Fault[] => {
  const drivingFaults: Fault[] = [];
  throwIfNotTestData(testData);
  // standard faults
  if (testData.drivingFaults) {
    convertNumericFaultObjectToArray(testData.drivingFaults)
      .forEach(drivingFault => drivingFaults.push(drivingFault));
  }
  // non standard faults
  getNonStandardFaultsCatADI2(testData, CompetencyOutcome.DF)
    .forEach(fault => drivingFaults.push(fault));
  return drivingFaults;
};

export const getSeriousFaultsCatADI2 = (testData: CatADI2UniqueTypes.TestData): Fault[] => {
  const seriousFaults: Fault[] = [];
  throwIfNotTestData(testData);
  // serious standard faults
  if (testData.seriousFaults) {
    convertBooleanFaultObjectToArray(testData.seriousFaults)
      .forEach(drivingFault => seriousFaults.push(drivingFault));
  }
  // serious non standard faults
  getNonStandardFaultsCatADI2(testData, CompetencyOutcome.S)
    .forEach(fault => seriousFaults.push(fault));
  // eyesight test
  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    seriousFaults.push({ name: Competencies.eyesightTest, count: 1 });
  }
  return seriousFaults;
};

export const getDangerousFaultsCatADI2 = (testData: CatADI2UniqueTypes.TestData): Fault[] => {
  const dangerousFaults: Fault[] = [];
  throwIfNotTestData(testData);
  // dangerous standard faults
  if (testData.dangerousFaults) {
    convertBooleanFaultObjectToArray(testData.dangerousFaults)
      .forEach(drivingFault => dangerousFaults.push(drivingFault));
  }
  // dangerous non standard faults
  getNonStandardFaultsCatADI2(testData, CompetencyOutcome.D)
    .forEach(fault => dangerousFaults.push(fault));
  return dangerousFaults;
};

export const throwIfNotTestData = (testData: CatADI2UniqueTypes.TestData): void => {
  if (!testData) {
    throw new Error('No Test Data');
  }
};

export const getNonStandardFaultsCatADI2 = (
  testData: CatADI2UniqueTypes.TestData, faultType: CompetencyOutcome): Fault[] => {
  const faults: Fault[] = [];
  // @TODO - vehicle checks
  // if (testData.vehicleChecks) {
  //   getVehicleChecksFaultsCatADI2(testData.vehicleChecks, faultType)
  //     .forEach(fault => faults.push(fault));
  // }
  // controlled stop
  if (testData.controlledStop && testData.controlledStop.selected) {
    getControlledStopFaultsCatADI2(testData.controlledStop, faultType)
      .forEach(fault => faults.push(fault));
  }
  // manoeuvres
  if (testData.manoeuvres) {
    getManoeuvresFaultsCatADI2(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }
  return faults;
};

export const getVehicleChecksFaultsCatADI2 = (
  vehicleChecks: CatADI2UniqueTypes.VehicleChecks, faultType: QuestionOutcome): Fault[] => {
  let faultCount = 0;
  if (vehicleChecks.tellMeQuestions) {
    vehicleChecks.tellMeQuestions.forEach((question) => {
      if (question.outcome && question.outcome === faultType) {
        faultCount = faultCount + 1;
      }
    });
    if (faultCount > 0) {
      return [{ name: Competencies.vehicleChecks, count: faultCount }];
    }
    return [];
  }
  return [];
};

export const getControlledStopFaultsCatADI2 = (
  controlledStop: ControlledStop, faultType: QuestionOutcome): Fault[] => {
  if (controlledStop.fault === faultType) {
    return [{ name: Competencies.controlledStop, count: 1 }];
  }
  return [];
};

export const getManoeuvresFaultsCatADI2 = (
  manoeuvres: Manoeuvres[], faultType: CompetencyOutcome): Fault[] => {
  const faults: Fault[] = [];
  if (manoeuvres && manoeuvres.length > 0) {
    manoeuvres.forEach((manoeuvre: Manoeuvres) => {
      const manoeuvreName = Object.getOwnPropertyNames(manoeuvre)[0];
      const manoeuvreObject = Object.values(manoeuvre)[0];
      if (manoeuvreObject.selected && manoeuvreObject.controlFault && manoeuvreObject.controlFault === faultType) {
        faults.push({ name: `${manoeuvreName}Control` as Competencies, count: 1 });
      }
      if (
        manoeuvreObject.selected && manoeuvreObject.observationFault && manoeuvreObject.observationFault === faultType
      ) {
        faults.push({ name: `${manoeuvreName}Observation` as Competencies, count: 1 });
      }
    });
  }
  return faults;
};
