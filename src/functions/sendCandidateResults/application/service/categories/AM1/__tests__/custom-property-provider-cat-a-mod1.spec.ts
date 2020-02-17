import {
  getCustomPropertiesCatAMod1,
} from '../custom-property-provider-cat-a-mod1';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';

describe('custom-property-provider-cat-a-mod1', () => {
  describe('getCustomPropertiesCatAMod1 :: EmergencyStop', () => {
    it('should return first and second emergency stop attempts', () => {
      const data: CatAMod1TestData = {
        emergencyStop: {
          firstAttempt: 55,
          secondAttempt: 66,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data);

      expect(result).toEqual(jasmine.objectContaining({
        showEmergencyStop: 'yes',
        showEmergencyFirstAttempt: 'yes',
        emergencyFirstAttempt: '55',
        showEmergencySecondAttempt: 'yes',
        emergencySecondAttempt: '66',
      }));
    });

    it('should return first emergency stop attempt only', () => {
      const data: CatAMod1TestData = {
        emergencyStop: {
          firstAttempt: 55,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data);

      expect(result).toEqual(jasmine.objectContaining({
        showEmergencyStop: 'yes',
        showEmergencyFirstAttempt: 'yes',
        emergencyFirstAttempt: '55',
        showEmergencySecondAttempt: 'no',
        emergencySecondAttempt: '',
      }));
    });

    it('should not return any emergency stop attempts', () => {
      const data: CatAMod1TestData = {
        emergencyStop: {},
      };

      const result: any = getCustomPropertiesCatAMod1(data);

      expect(result).toEqual(jasmine.objectContaining({
        showEmergencyStop: 'no',
        showEmergencyFirstAttempt: 'no',
        emergencyFirstAttempt: '',
        showEmergencySecondAttempt: 'no',
        emergencySecondAttempt: '',
      }));
    });
  });

  describe('getCustomPropertiesCatAMod1 :: AvoidanceExercise', () => {
    it('should return first and second avoidance attempts', () => {
      const data: CatAMod1TestData = {
        avoidance: {
          firstAttempt: 55,
          secondAttempt: 66,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data);

      expect(result).toEqual(jasmine.objectContaining({
        showAvoidanceExercise: 'yes',
        showAvoidanceFirstAttempt: 'yes',
        avoidanceFirstAttempt: '55',
        showAvoidanceSecondAttempt: 'yes',
        avoidanceSecondAttempt: '66',
      }));
    });

    it('should return first avoidance attempt only', () => {
      const data: CatAMod1TestData = {
        avoidance: {
          firstAttempt: 55,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data);

      expect(result).toEqual(jasmine.objectContaining({
        showAvoidanceExercise: 'yes',
        showAvoidanceFirstAttempt: 'yes',
        avoidanceFirstAttempt: '55',
        showAvoidanceSecondAttempt: 'no',
        avoidanceSecondAttempt: '',
      }));
    });

    it('should not return any emergency stop attempts', () => {
      const data: CatAMod1TestData = {
        avoidance: {},
      };

      const result: any = getCustomPropertiesCatAMod1(data);

      expect(result).toEqual(jasmine.objectContaining({
        showAvoidanceExercise: 'no',
        showAvoidanceFirstAttempt: 'no',
        avoidanceFirstAttempt: '',
        showAvoidanceSecondAttempt: 'no',
        avoidanceSecondAttempt: '',
      }));
    });
  });
});
