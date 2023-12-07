import {
  getCustomPropertiesCatAMod1,
} from '../custom-property-provider-cat-a-mod1';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { Language } from '../../../../../domain/template-id.model';

describe('custom-property-provider-cat-a-mod1', () => {
  describe('getCustomPropertiesCatAMod1 :: EmergencyStop', () => {
    it('should return first and second emergency stop attempts', () => {
      const data: CatAMod1TestData = {
        emergencyStop: {
          firstAttempt: 55,
          secondAttempt: 66,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data, Language.ENGLISH);

      expect(result).toEqual(jasmine.objectContaining({
        showEmergencyStop: true,
        showEmergencyFirstAttempt: true,
        emergencyFirstAttempt: '55 km/h',
        showEmergencySecondAttempt: true,
        emergencySecondAttempt: '66 km/h',
      }));
    });

    it('should return first emergency stop attempt only', () => {
      const data: CatAMod1TestData = {
        emergencyStop: {
          firstAttempt: 55,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data, Language.ENGLISH);

      expect(result).toEqual(jasmine.objectContaining({
        showEmergencyStop: true,
        showEmergencyFirstAttempt: true,
        emergencyFirstAttempt: '55 km/h',
        showEmergencySecondAttempt: false,
        emergencySecondAttempt: '',
      }));
    });

    it('should not return any emergency stop attempts', () => {
      const data: CatAMod1TestData = {
        emergencyStop: {},
      };

      const result: any = getCustomPropertiesCatAMod1(data, Language.ENGLISH);

      expect(result).toEqual(jasmine.objectContaining({
        showEmergencyStop: false,
        showEmergencyFirstAttempt: false,
        emergencyFirstAttempt: '',
        showEmergencySecondAttempt: false,
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

      const result: any = getCustomPropertiesCatAMod1(data, Language.ENGLISH);

      expect(result).toEqual(jasmine.objectContaining({
        showAvoidanceExercise: true,
        showAvoidanceFirstAttempt: true,
        avoidanceFirstAttempt: '55 km/h',
        showAvoidanceSecondAttempt: true,
        avoidanceSecondAttempt: '66 km/h',
      }));
    });

    it('should return first avoidance attempt only', () => {
      const data: CatAMod1TestData = {
        avoidance: {
          firstAttempt: 55,
        },
      };

      const result: any = getCustomPropertiesCatAMod1(data, Language.ENGLISH);

      expect(result).toEqual(jasmine.objectContaining({
        showAvoidanceExercise: true,
        showAvoidanceFirstAttempt: true,
        avoidanceFirstAttempt: '55 km/h',
        showAvoidanceSecondAttempt: false,
        avoidanceSecondAttempt: '',
      }));
    });

    it('should not return any emergency stop attempts', () => {
      const data: CatAMod1TestData = {
        avoidance: {},
      };

      const result: any = getCustomPropertiesCatAMod1(data, Language.ENGLISH);

      expect(result).toEqual(jasmine.objectContaining({
        showAvoidanceExercise: false,
        showAvoidanceFirstAttempt: false,
        avoidanceFirstAttempt: '',
        showAvoidanceSecondAttempt: false,
        avoidanceSecondAttempt: '',
      }));
    });
  });
});
