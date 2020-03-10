import {
  getDrivingFaultsCatAMod1,
  getSeriousFaultsCatAMod1,
  getDangerousFaultsCatAMod1,
  getSingleFaultCompetencyFaults,
  getSingleFaultCompetencyFault,
  getAvoidanceSpeedNotMet,
  getEmergencyStopSpeedNotMet,
} from '../fault-provider-cat-a-mod1';
import {
  TestData,
  SingleFaultCompetencyOutcome,
  Avoidance,
  SingleFaultCompetencies,
  EmergencyStop,
} from '@dvsa/mes-test-schema/categories/AM1';
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
    const singleFaultCompetencies = {
      useOfStand: CompetencyOutcome.DF,
      manualHandling: CompetencyOutcome.DF,
      slalom: CompetencyOutcome.D,
      slowControl: CompetencyOutcome.S,
      uTurn: CompetencyOutcome.D,
      controlledStop: CompetencyOutcome.S,
      emergencyStop: CompetencyOutcome.S,
      avoidance: CompetencyOutcome.S,
    };

    it('should throw error when not singleFaultCompetencies', () => {
      const singleFaultCompetencies = undefined;
      expect(() => {
        getSingleFaultCompetencyFaults(singleFaultCompetencies, CompetencyOutcome.DF);
      }).toThrowError('No Single Fault Competencies');
    });
    it('should return Driving Fault singleFaultCompetencies', () => {
      const resultDF = getSingleFaultCompetencyFaults(singleFaultCompetencies, CompetencyOutcome.DF);
      expect(resultDF).toEqual([
        { name: Competencies.useOfStand, count: 1 },
        { name: Competencies.manualHandling, count: 1 },
      ]);
    });
    it('should return Serious Fault singleFaultCompetencies', () => {
      const resultS = getSingleFaultCompetencyFaults(singleFaultCompetencies, CompetencyOutcome.S);
      expect(resultS).toEqual([
        { name: Competencies.controlledStop, count: 1 },
        { name: Competencies.slowControl, count: 1 },
        { name: Competencies.emergencyStop, count: 1 },
        { name: Competencies.avoidance, count: 1 },
      ]);
    });
    it('should return Dangerous Fault singleFaultCompetencies', () => {
      const resultD = getSingleFaultCompetencyFaults(singleFaultCompetencies, CompetencyOutcome.D);
      expect(resultD).toEqual([
        { name: Competencies.slalom, count: 1 },
        { name: Competencies.uTurn, count: 1 },
      ]);
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

  describe('getAvoidanceSpeedNotMet', () => {
    it('should return avoidence speed not met competency', () => {
      const avoidanceSpeedNotMet: Avoidance = {
        outcome: CompetencyOutcome.S,
        comments: 'comment2',
      };
      const result = getAvoidanceSpeedNotMet(avoidanceSpeedNotMet);
      expect(result).toEqual([
        { name: Competencies.avoidanceSpeedNotMet, count: 1 },
      ]);
    });
  });

  describe('getEmergencyStopSpeedNotMet', () => {
    it('should return emergency stop speed not met competency', () => {
      const emergencyStopSpeedNotMet: EmergencyStop = {
        outcome: CompetencyOutcome.S,
        comments: 'comment2',
      };
      const result = getEmergencyStopSpeedNotMet(emergencyStopSpeedNotMet);
      expect(result).toEqual([
        { name: Competencies.emergencyStopSpeedNotMet, count: 1 },
      ]);
    });
  });
});
