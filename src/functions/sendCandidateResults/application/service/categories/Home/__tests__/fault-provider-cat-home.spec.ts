import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatHome,
  getDrivingFaultsCatHome,
  getNonStandardFaultsCatHome,
  getSeriousFaultsCatHome,
} from '../fault-provider-cat-home';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-home', () => {
  describe('getDangerousFaultsCatHome', () => {
    it('should return a list of dangerous faults found in the test data', () => {
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
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.D,
        },
      };
      const result: Fault [] = getDangerousFaultsCatHome(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.controlledStop, count: 1 });
    });
  });

  describe('getSeriousFaultsCatHome', () => {
    it('should return a list of serious faults found in the test data', () => {
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
        highwayCodeSafety: {
          selected: true,
          seriousFault: true,
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.S,
        },
        eyesightTest: {
          seriousFault: true,
        },
      };

      const result: Fault [] = getSeriousFaultsCatHome(data);
      expect(result.length).toBe(5);
      };

      const result: Fault [] = getSeriousFaultsCatHome(data);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.highwayCodeSafety, count: 1 });
      expect(result).toContain({ name: Competencies.controlledStop, count: 1 });
      expect(result).toContain({ name: Competencies.eyesightTest, count: 1 });
    });
  });

  describe('getDrivingFaultsCatHome', () => {
    it('should return a list of driving faults found in the test data', () => {
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
        highwayCodeSafety: {
          selected: true,
          drivingFault: false,
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.DF,
        },
      };
      const result: Fault [] = getDrivingFaultsCatHome(data);

      expect(result.length).toBe(3);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
        { name: Competencies.controlledStop, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatHome', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatFUniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatHome(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
