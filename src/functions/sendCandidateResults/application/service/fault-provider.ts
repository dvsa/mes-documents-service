import {
  TestData,
  ManoeuvreOutcome,
  VehicleChecks,
  QuestionOutcome,
  ActivityCode,
} from '@dvsa/mes-test-schema/categories/B';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { CompetencyOutcome } from '../../domain/competency-outcome';
import { Fault } from '../../domain/fault';
import { Competencies } from '../../domain/competencies';

export interface IFaultProvider {
  getDrivingFaults(testData: TestData | undefined): Fault[];

  getSeriousFaults(testData: TestData | undefined): Fault[];

  getDangerousFaults(testData: TestData | undefined): Fault[];

}

@injectable()
export class FaultProvider implements IFaultProvider {

  public getDrivingFaults(testData: TestData | undefined): Fault [] {
    const drivingFaults: Fault[] = [];

    if (!testData) {
      throw new Error('No Test Data');
    }

    if (testData.drivingFaults) {
      convertNumericFaultObjectToArray(testData.drivingFaults)
        .forEach(fault => drivingFaults.push(fault));
    }

    getNonStandardFaults(testData, CompetencyOutcome.DF)
      .forEach(fault => drivingFaults.push(fault));

    return drivingFaults;
  }

  public getSeriousFaults(testData: TestData | undefined): Fault [] {
    const seriousFaults: Fault[] = [];

    if (!testData) {
      throw new Error('No Test Data');
    }

    if (testData.seriousFaults) {
      convertBooleanFaultObjectToArray(testData.seriousFaults)
        .forEach(fault => seriousFaults.push(fault));
    }

    getNonStandardFaults(testData, CompetencyOutcome.S)
      .forEach(fault => seriousFaults.push(fault));

    return seriousFaults;
  }

  public getDangerousFaults(testData: TestData | undefined): Fault [] {
    const dangerousFaults: Fault[] = [];

    if (!testData) {
      throw new Error('No Test Data');
    }

    if (testData.dangerousFaults) {
      convertBooleanFaultObjectToArray(testData.dangerousFaults)
        .forEach(fault => dangerousFaults.push(fault));
    }

    getNonStandardFaults(testData, CompetencyOutcome.D)
      .forEach(fault => dangerousFaults.push(fault));

    return dangerousFaults;
  }
}

export function convertNumericFaultObjectToArray(faults: any): Fault[] {
  return Object.keys(faults)
  .filter(key => !key.toLowerCase().endsWith('comments'))
  .map((key) => { return { name: key , count: faults[key] } as Fault; })
  .filter(fault => fault.count > 0);
}

export function  convertBooleanFaultObjectToArray(faults: any): Fault[] {
  return Object.keys(faults)
  .filter(key => !key.toLowerCase().endsWith('comments'))
  .filter(key => faults[key])
  .map((key) => { return { name: key , count: 1 } as Fault; });
}

export function getNonStandardFaults(testData: TestData, faultType: CompetencyOutcome) : Fault[] {
  const faults: Fault[] = [];

// Controlled Stop
  if (
  testData.controlledStop &&
  testData.controlledStop.selected &&
  testData.controlledStop.fault === faultType) {
    faults.push({ name: Competencies.controlledStop, count: 1 });
  }

// Manoeuvres
  if (testData.manoeuvres) {
    getCompletedManoeuvres(testData.manoeuvres, faultType)
      .forEach(fault => faults.push(fault));
  }

// Vehicle Checks
  if (testData.vehicleChecks) {
    getVehicleChecksFault(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
  }

  if (testData.eyesightTest && testData.eyesightTest.seriousFault) {
    faults.push({ name: Competencies.eyesightTest, count: 1 });
  }

  return faults;
}

export function getCompletedManoeuvres(manoeuvres : any, faultType: ManoeuvreOutcome) : Fault[] {
  const result: Fault[] = [];

  Object.keys(manoeuvres).forEach((manoeuvreName) => {
    if (manoeuvres[manoeuvreName].selected === true) {
      if (manoeuvres[manoeuvreName].controlFault && manoeuvres[manoeuvreName].controlFault === faultType) {
        result.push({ name: `${manoeuvreName}Control` as Competencies, count: 1 });
      }
      if (manoeuvres[manoeuvreName].observationFault && manoeuvres[manoeuvreName].observationFault === faultType) {
        result.push({ name: `${manoeuvreName}Observation` as Competencies, count: 1 });
      }
    }
  });

  return result;
}

export function getVehicleChecksFault(vehicleChecks: VehicleChecks, faultType: QuestionOutcome) : Fault[] {
  if (faultType === 'D') {
    if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === 'D') {
      return [{ name: Competencies.vehicleChecks, count: 1 }];
    }
  }

  if (faultType === 'S') {
    if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === 'S') {
      return [{ name:  Competencies.vehicleChecks, count: 1 }];
    }
  }

  if (faultType === 'DF') {
    if (
      vehicleChecks.showMeQuestion &&
      (vehicleChecks.showMeQuestion.outcome === 'S' || vehicleChecks.showMeQuestion.outcome === 'D')
    ) {
      return [];
    }

    if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === 'DF') {
      return [{ name: Competencies.vehicleChecks, count: 1 }];
    }

    if (vehicleChecks.tellMeQuestion && vehicleChecks.tellMeQuestion.outcome === 'DF') {
      return [{ name: Competencies.vehicleChecks , count: 1 }];
    }
  }
  return [];
}
