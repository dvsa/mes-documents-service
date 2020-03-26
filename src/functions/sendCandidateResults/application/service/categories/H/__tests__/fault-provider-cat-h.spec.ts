import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatH,
  getDrivingFaultsCatH,
  getNonStandardFaultsCatH,
  getSeriousFaultsCatH,
} from '../fault-provider-cat-h';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-h', () => {
  describe('getDangerousFaultsCatH', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatHUniqueTypes.TestData = {
        dangerousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
        manoeuvres: {
          reverseLeft: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
      };
      const result: Fault [] = getDangerousFaultsCatH(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatH', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatHUniqueTypes.TestData = {
        seriousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
        manoeuvres: {
          reverseLeft: {
            selected: true,
            controlFault: CompetencyOutcome.S,
          },
        },
      };

      const result: Fault [] = getSeriousFaultsCatH(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatH', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatHUniqueTypes.TestData = {
        drivingFaults: {
          ancillaryControls: 1,
          awarenessPlanning: 0,
        },
        manoeuvres: {
          reverseLeft: {
            selected: true,
            controlFault: CompetencyOutcome.DF,
          },
        },
      };
      const result: Fault [] = getDrivingFaultsCatH(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
                               { name: Competencies.ancillaryControls, count: 1 },
                               { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatH', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatHUniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatH(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
