import { injectable } from 'inversify';
import 'reflect-metadata';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestData, ManoeuvreOutcome, QuestionOutcome, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as CatAMod2TestData } from '@dvsa/mes-test-schema/categories/AM2';
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
import {
  getDangerousFaultsCatC,
  getDrivingFaultsCatC,
  getSeriousFaultsCatC,
} from './categories/C/fault-provider-cat-c';
import {
  getDangerousFaultsCatCE,
  getDrivingFaultsCatCE,
  getSeriousFaultsCatCE,
} from './categories/CE/fault-provider-cat-ce';
import {
  getDangerousFaultsCatC1,
  getDrivingFaultsCatC1,
  getSeriousFaultsCatC1,
} from './categories/C1/fault-provider-cat-c1';
import {
  getDangerousFaultsCatC1E,
  getDrivingFaultsCatC1E,
  getSeriousFaultsCatC1E,
} from './categories/C1E/fault-provider-cat-c1e';
import {
  getDangerousFaultsCatD,
  getDrivingFaultsCatD,
  getSeriousFaultsCatD,
} from './categories/D/fault-provider-cat-d';
import {
  getDangerousFaultsCatD1,
  getDrivingFaultsCatD1,
  getSeriousFaultsCatD1,
} from './categories/D1/fault-provider-cat-d1';
import {
  getDangerousFaultsCatDE,
  getDrivingFaultsCatDE,
  getSeriousFaultsCatDE,
} from './categories/DE/fault-provider-cat-de';
import {
  getDangerousFaultsCatD1E,
  getDrivingFaultsCatD1E,
  getSeriousFaultsCatD1E,
} from './categories/D1E/fault-provider-cat-d1e';
import {
  getDrivingFaultsCatAMod1,
  getSeriousFaultsCatAMod1,
  getDangerousFaultsCatAMod1,
} from './categories/AM1/fault-provider-cat-a-mod1';
import {
  getDrivingFaultsCatAMod2,
  getSeriousFaultsCatAMod2,
  getDangerousFaultsCatAMod2,
} from './categories/AM2/fault-provider-cat-a-mod2';
import {
  getDangerousFaultsCatHome,
  getDrivingFaultsCatHome,
  getSeriousFaultsCatHome,
} from './categories/Home/fault-provider-cat-home';
import {
  getDangerousFaultsCatADI2,
  getDrivingFaultsCatADI2,
  getSeriousFaultsCatADI2,
} from './categories/ADI2/fault-provider-cat-adi-pt2';

// No CatBUniqueTypes.VehicleChecks as the data structure differs to other categories
type VehicleChecksUnion =
  CatBEUniqueTypes.VehicleChecks |
  CatCUniqueTypes.VehicleChecks |
  CatC1UniqueTypes.VehicleChecks |
  CatCEUniqueTypes.VehicleChecks |
  CatC1EUniqueTypes.VehicleChecks |
  CatDUniqueTypes.VehicleChecks |
  CatD1UniqueTypes.VehicleChecks |
  CatDEUniqueTypes.VehicleChecks |
  CatD1EUniqueTypes.VehicleChecks |
  CatFUniqueTypes.VehicleChecks |
  CatGUniqueTypes.VehicleChecks |
  CatHUniqueTypes.VehicleChecks |
  CatKUniqueTypes.VehicleChecks;

export type HomeTestDataUnion =
  CatFUniqueTypes.TestData
  | CatGUniqueTypes.TestData
  | CatHUniqueTypes.TestData
  | CatKUniqueTypes.TestData;

export interface IFaultProvider {
  getDrivingFaults(testData: TestData | undefined, category: string): Fault[];

  getSeriousFaults(testData: TestData | undefined, category: string): Fault[];

  getDangerousFaults(testData: TestData | undefined, category: string): Fault[];
}

@injectable()
export class FaultProvider implements IFaultProvider {

  public getDrivingFaults(testData: TestData | undefined, category: string): Fault[] {
    switch (category) {
      case TestCategory.ADI2: return getDrivingFaultsCatADI2(testData as CatADI2UniqueTypes.TestData);
      case TestCategory.B: return getDrivingFaultsCatB(testData as CatBUniqueTypes.TestData);
      case TestCategory.BE: return getDrivingFaultsCatBE(testData as CatBEUniqueTypes.TestData);
      case TestCategory.C: return getDrivingFaultsCatC(testData as CatCUniqueTypes.TestData);
      case TestCategory.C1: return getDrivingFaultsCatC1(testData as CatC1UniqueTypes.TestData);
      case TestCategory.CE: return getDrivingFaultsCatCE(testData as CatCEUniqueTypes.TestData);
      case TestCategory.C1E: return getDrivingFaultsCatC1E(testData as CatC1EUniqueTypes.TestData);
      case TestCategory.D: return getDrivingFaultsCatD(testData as CatDUniqueTypes.TestData);
      case TestCategory.D1: return getDrivingFaultsCatD1(testData as CatD1UniqueTypes.TestData);
      case TestCategory.DE: return getDrivingFaultsCatDE(testData as CatDEUniqueTypes.TestData);
      case TestCategory.D1E: return getDrivingFaultsCatD1E(testData as CatD1EUniqueTypes.TestData);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1: return getDrivingFaultsCatAMod1(testData as CatAMod1TestData);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2: return getDrivingFaultsCatAMod2(testData as CatAMod2TestData);
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K: return getDrivingFaultsCatHome(testData as CatKUniqueTypes.TestData);
      default: return getDrivingFaultsCatB(testData as CatBUniqueTypes.TestData);
    }
  }

  public getSeriousFaults(testData: TestData | undefined, category: string): Fault[] {
    switch (category) {
      case TestCategory.ADI2: return getSeriousFaultsCatADI2(testData as CatADI2UniqueTypes.TestData);
      case TestCategory.B: return getSeriousFaultsCatB(testData as CatBUniqueTypes.TestData);
      case TestCategory.BE: return getSeriousFaultsCatBE(testData as CatBEUniqueTypes.TestData);
      case TestCategory.C: return getSeriousFaultsCatC(testData as CatCUniqueTypes.TestData);
      case TestCategory.C1: return getSeriousFaultsCatC1(testData as CatC1UniqueTypes.TestData);
      case TestCategory.CE: return getSeriousFaultsCatCE(testData as CatCEUniqueTypes.TestData);
      case TestCategory.C1E: return getSeriousFaultsCatC1E(testData as CatC1EUniqueTypes.TestData);
      case TestCategory.D: return getSeriousFaultsCatD(testData as CatDUniqueTypes.TestData);
      case TestCategory.D1: return getSeriousFaultsCatD1(testData as CatD1UniqueTypes.TestData);
      case TestCategory.DE: return getSeriousFaultsCatDE(testData as CatDEUniqueTypes.TestData);
      case TestCategory.D1E: return getSeriousFaultsCatD1E(testData as CatD1EUniqueTypes.TestData);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1: return getSeriousFaultsCatAMod1(testData as CatAMod1TestData);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2: return getSeriousFaultsCatAMod2(testData as CatAMod2TestData);
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K: return getSeriousFaultsCatHome(testData as HomeTestDataUnion);
      default: return getSeriousFaultsCatB(testData as CatBUniqueTypes.TestData);
    }
  }

  public getDangerousFaults(testData: TestData | undefined, category: string): Fault [] {
    switch (category) {
      case TestCategory.ADI2: return getDangerousFaultsCatADI2(testData as CatADI2UniqueTypes.TestData);
      case TestCategory.B: return getDangerousFaultsCatB(testData as CatBUniqueTypes.TestData);
      case TestCategory.BE: return getDangerousFaultsCatBE(testData as CatBEUniqueTypes.TestData);
      case TestCategory.C: return getDangerousFaultsCatC(testData as CatCUniqueTypes.TestData);
      case TestCategory.C1: return getDangerousFaultsCatC1(testData as CatC1UniqueTypes.TestData);
      case TestCategory.CE: return getDangerousFaultsCatCE(testData as CatCEUniqueTypes.TestData);
      case TestCategory.C1E: return getDangerousFaultsCatC1E(testData as CatC1EUniqueTypes.TestData);
      case TestCategory.D: return getDangerousFaultsCatD(testData as CatDUniqueTypes.TestData);
      case TestCategory.D1: return getDangerousFaultsCatD1(testData as CatD1UniqueTypes.TestData);
      case TestCategory.DE: return getDangerousFaultsCatDE(testData as CatDEUniqueTypes.TestData);
      case TestCategory.D1E: return getDangerousFaultsCatD1E(testData as CatD1EUniqueTypes.TestData);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1: return getDangerousFaultsCatAMod1(testData as CatAMod1TestData);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2: return getDangerousFaultsCatAMod2(testData as CatAMod2TestData);
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K: return getDangerousFaultsCatHome(testData as HomeTestDataUnion);
      default: return getDangerousFaultsCatB(testData as CatBUniqueTypes.TestData);
    }
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

export function getVehicleCheckFaultCount(vehicleChecks: VehicleChecksUnion, faultType: QuestionOutcome): number {
  let questionCount: number = 0;

  if (vehicleChecks) {
    if (vehicleChecks.showMeQuestions) {
      questionCount = questionCount +
        vehicleChecks.showMeQuestions.filter((showMe: QuestionResult) => showMe.outcome === faultType).length;
    }
    if (vehicleChecks.tellMeQuestions) {
      questionCount = questionCount +
        vehicleChecks.tellMeQuestions.filter((tellMe: QuestionResult) => tellMe.outcome === faultType).length;
    }
  }
  return questionCount;
}
