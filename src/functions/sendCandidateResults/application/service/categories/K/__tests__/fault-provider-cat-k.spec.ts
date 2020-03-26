import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatK,
  getDrivingFaultsCatK,
  getSeriousFaultsCatK,
} from '../fault-provider-cat-k';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-k', () => {
  describe('getDangerousFaultsCatK', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatKUniqueTypes.TestData = {
        dangerousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
      };
      const result: Fault [] = getDangerousFaultsCatK(data);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
    });
  });

  describe('getSeriousFaultsCatK', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatKUniqueTypes.TestData = {
        seriousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
      };

      const result: Fault [] = getSeriousFaultsCatK(data);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
    });
  });

  describe('getDrivingFaultsCatK', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatKUniqueTypes.TestData = {
        drivingFaults: {
          ancillaryControls: 1,
          awarenessPlanning: 0,
        },
      };
      const result: Fault [] = getDrivingFaultsCatK(data);

      expect(result.length).toBe(1);
      expect(result).toEqual([{ name: Competencies.ancillaryControls, count: 1 }]);
    });
  });
});
