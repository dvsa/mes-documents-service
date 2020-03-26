import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatG,
  getDrivingFaultsCatG,
  getNonStandardFaultsCatG,
  getSeriousFaultsCatG,
} from '../fault-provider-cat-g';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-g', () => {
  describe('getDangerousFaultsCatG', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatGUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatG(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatG', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatGUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatG(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatG', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatGUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatG(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
                               { name: Competencies.ancillaryControls, count: 1 },
                               { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatG', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatGUniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatG(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
