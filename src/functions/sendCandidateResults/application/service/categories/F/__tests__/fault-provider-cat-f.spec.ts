import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatF,
  getDrivingFaultsCatF,
  getNonStandardFaultsCatF,
  getSeriousFaultsCatF,
} from '../fault-provider-cat-f';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-f', () => {
  describe('getDangerousFaultsCatF', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatFUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatF(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatF', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatFUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatF(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatF', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatFUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatF(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
                               { name: Competencies.ancillaryControls, count: 1 },
                               { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatF', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatFUniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatF(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
