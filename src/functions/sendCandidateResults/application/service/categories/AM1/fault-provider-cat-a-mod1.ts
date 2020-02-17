
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { Fault } from '../../../../domain/fault';
import { convertNumericFaultObjectToArray } from '../../fault-provider';

export const getDrivingFaultsCatAMod1 = (testData: CatAMod1TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  return [
    ...convertNumericFaultObjectToArray(testData.drivingFaults),
    ...getSingleFaultCompetencyFaults(testData.singleFaultCompetencies),
    ...getSpeedCheckCompetencyFaults(testData.emergencyStop, testData.avoidance),
  ];
};

export const getSeriousFaultsCatAMod1 = (testData: CatAMod1TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  return [
    // ...Faults Array
    // ...SingleFaults Array
    // ...SpeedChecks Array
  ];
};

export const getDangerousFaultsCatAMod1 = (testData: CatAMod1TestData | undefined): Fault[] => {

  if (!testData) {
    throw new Error('No Test Data');
  }

  return [
    // ...Faults Array
    // ...SingleFaults Array
    // ...SpeedChecks Array
  ];
};

export const getSingleFaultCompetencyFaults()
