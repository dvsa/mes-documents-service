import {
  getDrivingFaultsCatAMod1,
  getSeriousFaultsCatAMod1,
  getDangerousFaultsCatAMod1,
  getSingleFaultCompetencyFaults,
  getSingleFaultCompetencyFault,
  getAvoidanceFaults,
  getEmergencyStopFaults,
} from '../fault-provider-cat-a-mod1';
import { TestData, SingleFaultCompetencies, SingleFaultCompetencyOutcome } from '@dvsa/mes-test-schema/categories/AM1';
import * as faultProviderModule from '../../../fault-provider';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Competencies } from '../../../../../domain/competencies';

describe('Fault Provider Cat A Mod1', () => {
  describe('getDrivingFaultsCatAMod1', () => {
    it('should throw error when not test data', () => {
      const testData = undefined;
      expect(() => {
        getDrivingFaultsCatAMod1(testData);
      }).toThrowError('No Test Data');
    });
  });

  describe('getSeriousFaultsCatAMod1', () => {
    it('should throw error when not test data', () => {
      const testData = undefined;
      expect(() => {
        getSeriousFaultsCatAMod1(testData);
      }).toThrowError('No Test Data');
    });
  });

  describe('getDangerousFaultsCatAMod1', () => {
    it('should throw error when not test data', () => {
      const testData = undefined;
      expect(() => {
        getDangerousFaultsCatAMod1(testData);
      }).toThrowError('No Test Data');
    });
  });

  describe('getSingleFaultCompetencyFaults', () => {
    it('should throw error when not singleFaultCompetencies', () => {
      const singleFaultCompetencies = undefined;
      expect(() => {
        getSingleFaultCompetencyFaults(singleFaultCompetencies, CompetencyOutcome.DF);
      }).toThrowError('No Single Fault Competencies');
    });
  });

  describe('getSingleFaultCompetencyFault', () => {
    it('should return empty array when competency does not have the specified outcome', () => {
      const competencies: SingleFaultCompetencies = {
        useOfStand: CompetencyOutcome.S,
      };
      const result = getSingleFaultCompetencyFault(competencies, 'useOfStand', CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });

    it('should construct and return the right Fault object', () => {
      const competencies: SingleFaultCompetencies = {
        useOfStand: CompetencyOutcome.DF,
      };
      const result = getSingleFaultCompetencyFault(
        competencies, 'useOfStand', CompetencyOutcome.DF);
      expect(result).toEqual([{
        name: Competencies.useOfStand,
        count: 1,
      }]);
    });
  });
});
