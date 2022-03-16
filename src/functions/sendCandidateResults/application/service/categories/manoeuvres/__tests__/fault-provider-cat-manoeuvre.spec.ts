import { CatCEMUniqueTypes } from '@dvsa/mes-test-schema/categories/CEM';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatManoeuvre,
  getNonStandardFaultsCatManoeuvre,
  getSeriousFaultsCatManoeuvre,
} from '../fault-provider-cat-manoeuvre';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-manoeuvre', () => {
  describe('getDangerousFaultsCatManoeuvre', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatCEMUniqueTypes.TestData = {
        dangerousFaults: {},
        manoeuvres: {
          reverseManoeuvre: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
      };
      const result: Fault [] = getDangerousFaultsCatManoeuvre(data);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.reverseManoeuvreControl, count: 1 });
    });
    it('should give us a list of faults from different sections of the test data', () => {
      const data = {
        uncoupleRecouple: {
          fault: 'D',
          faultComments: 'some comment',
          selected: true,
        },
        manoeuvres: {
          reverseManoeuvre: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
      } as CatCEMUniqueTypes.TestData;
      const result: Fault [] = getDangerousFaultsCatManoeuvre(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
      expect(result).toContain({ name: Competencies.reverseManoeuvreControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatManoeuvre', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data = {
        seriousFaults: {},
        manoeuvres: {
          reverseManoeuvre: {
            selected: true,
            controlFault: CompetencyOutcome.S,
          },
        },
      } as CatCEMUniqueTypes.TestData;

      const result: Fault [] = getSeriousFaultsCatManoeuvre(data);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.reverseManoeuvreControl, count: 1 });
    });
    it('should give us a list of faults from different sections of the test data', () => {
      const data = {
        uncoupleRecouple: {
          fault: 'S',
          faultComments: 'some comment',
          selected: true,
        },
        manoeuvres: {
          reverseManoeuvre: {
            selected: true,
            controlFault: CompetencyOutcome.S,
          },
        },
      } as CatCEMUniqueTypes.TestData;
      const result: Fault [] = getSeriousFaultsCatManoeuvre(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
      expect(result).toContain({ name: Competencies.reverseManoeuvreControl, count: 1 });
    });
  });

  describe('getNonStandardFaultsCatManoeuvre', () => {
    it('should return the uncouple competency when fault type is same to fault passed in and it was selected', () => {
      const data: CatCEMUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'D',
          faultComments: 'some comment',
          selected: true,
        },
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatManoeuvre(data, CompetencyOutcome.D);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
    });

    it('should return an empty array when the selected value is false', () => {
      const data: CatCEMUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'S',
          faultComments: 'some comment',
          selected: false,
        },
      };
      const result: Fault[] = getNonStandardFaultsCatManoeuvre(data, CompetencyOutcome.S);
      expect(result).toEqual([]);
    });
  });
});
