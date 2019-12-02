import {
  TestData,
  ManoeuvreOutcome,
} from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { Fault } from '../../domain/fault';
import { Competencies } from '../../domain/competencies';
import {
  getDrivingFaultsCatB,
  getSeriousFaultsCatB,
  getDangerousFaultsCatB,
} from './categories/B/fault-provider-cat-b';

import {
  getDangerousFaultsCatBE,
  getDrivingFaultsCatBE,
  getSeriousFaultsCatBE,
} from './categories/BE/fault-provider-cat-be';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
export interface IFaultProvider {
  getDrivingFaults(testData: TestData | undefined, category: string): Fault[];

  getSeriousFaults(testData: TestData | undefined, category: string): Fault[];

  getDangerousFaults(testData: TestData | undefined, category: string): Fault[];
}

@injectable()
export class FaultProvider implements IFaultProvider {

  public getDrivingFaults(testData: TestData | undefined, category: string): Fault[] {
    let faults: Fault[] = [];

    switch (category) {
      case TestCategory.B:
        faults = getDrivingFaultsCatB(testData as CatBUniqueTypes.TestData);
        break;
      case TestCategory.BE:
        faults = getDrivingFaultsCatBE(testData as CatBEUniqueTypes.TestData);
        break;
      default:
        faults = getDrivingFaultsCatB(testData as CatBUniqueTypes.TestData);
        break;
    }
    return faults;
  }

  public getSeriousFaults(testData: TestData | undefined, category: string): Fault[] {
    let faults: Fault[] = [];

    switch (category) {
      case TestCategory.B:
        faults = getSeriousFaultsCatB(testData as CatBUniqueTypes.TestData);
        break;
      case TestCategory.BE:
        faults = getSeriousFaultsCatBE(testData as CatBEUniqueTypes.TestData);
        break;
      default:
        faults = getSeriousFaultsCatB(testData as CatBUniqueTypes.TestData);
        break;
    }
    return faults;
  }

  public getDangerousFaults(testData: TestData | undefined, category: string): Fault [] {
    let faults: Fault[] = [];

    switch (category) {
      case TestCategory.B:
        faults = getDangerousFaultsCatB(testData as CatBUniqueTypes.TestData);
        break;
      case TestCategory.BE:
        faults = getDangerousFaultsCatBE(testData as CatBEUniqueTypes.TestData);
        break;
      default:
        faults = getDangerousFaultsCatB(testData as CatBUniqueTypes.TestData);
        break;
    }
    return faults;
  }
}

export function convertNumericFaultObjectToArray(faults: any): Fault[] {
  return Object.keys(faults)
    .filter(key => !key.toLowerCase().endsWith('comments'))
    .map((key) => {
      return { name: key, count: faults[key] } as Fault;
    })
    .filter(fault => fault.count > 0);
}

export function convertBooleanFaultObjectToArray(faults: any): Fault[] {
  return Object.keys(faults)
    .filter(key => !key.toLowerCase().endsWith('comments'))
    .filter(key => faults[key])
    .map((key) => {
      return { name: key, count: 1 } as Fault;
    });
}

export function getCompletedManoeuvres(manoeuvres: any, faultType: ManoeuvreOutcome): Fault[] {
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
