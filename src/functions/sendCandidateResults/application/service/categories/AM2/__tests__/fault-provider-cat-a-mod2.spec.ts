import {
  getDrivingFaultsCatAMod2,
  getSeriousFaultsCatAMod2,
  getDangerousFaultsCatAMod2,
  hasQuestionFault,
} from '../fault-provider-cat-a-mod2';

import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Competencies } from '../../../../../domain/competencies';

describe('Fault Provider Cat A Mod2', () => {
  const validTestData = {
    testRequirements: {
      normalStart1: true,
      normalStart2: true,
      angledStart: true,
      hillStart: true,
    },
    drivingFaults: {
      controlsThrottle: 2,
      responseToSignsTrafficSigns: 1,
      responseToSignsTrafficControllers: 2,
    },
    seriousFaults: {
      useOfMirrorsChangeSpeed: true,
      signalsTimed: true,
    },
    dangerousFaults: {
      signalsNecessary: true,
    },
    safetyAndBalanceQuestions: {
      safetyQuestions: [{
        code: 'SQ1',
        description: 'Oil level',
        outcome: CompetencyOutcome.DF,
      }, {
        code: 'SQ2',
        description: 'Horn working',
        outcome: CompetencyOutcome.DF,
      }],
      balanceQuestions: [{
        code: 'BQ1',
        description: 'Pillion passenger problems',
        outcome: CompetencyOutcome.DF,
      }],
    },
    eyesightTest: {
      complete: true,
      seriousFault: true,
    },
    ETA: {
      verbal: false,
    },
  };

  describe('getDrivingFaultsCatAMod2', () => {
    it('should throw error when not test data', () => {
      const testData = undefined;
      expect(() => {
        getDrivingFaultsCatAMod2(testData);
      }).toThrowError('No Test Data');
    });
    it('should return correct response when test data is provided', () => {
      expect(getDrivingFaultsCatAMod2(validTestData)).toEqual([
        { name: Competencies.controlsThrottle, count: 2 },
        { name: Competencies.responseToSignsTrafficSigns, count: 1 },
        { name: Competencies.responseToSignsTrafficControllers, count: 2 },
        { name: Competencies.safetyAndBalance, count: 1 },
      ]);
    });
  });

  describe('getSeriousFaultsCatAMod2', () => {
    it('should throw error when not test data', () => {
      const testData = undefined;
      expect(() => {
        getSeriousFaultsCatAMod2(testData);
      }).toThrowError('No Test Data');
    });
    it('should return correct response when test data is provided', () => {
      expect(getSeriousFaultsCatAMod2(validTestData)).toEqual([
        { name: Competencies.useOfMirrorsChangeSpeed, count: 1 },
        { name: Competencies.signalsTimed, count: 1 },
      ]);
    });
  });

  describe('getDangerousFaultsCatAMod2', () => {
    it('should throw error when not test data', () => {
      const testData = undefined;
      expect(() => {
        getDangerousFaultsCatAMod2(testData);
      }).toThrowError('No Test Data');
    });
    it('should return correct response when test data is provided', () => {
      expect(getDangerousFaultsCatAMod2(validTestData)).toEqual([
        { name: Competencies.signalsNecessary, count: 1 },
      ]);
    });
  });

  describe('hasQuestionFaultCatAMod2', () => {
    it('should return true when provided with faults', () => {
      expect(hasQuestionFault(validTestData.safetyAndBalanceQuestions)).toEqual(true);
    });
    it('should return false when provided with no faults', () => {
      expect(hasQuestionFault({})).toEqual(false);
    });
  });
});
