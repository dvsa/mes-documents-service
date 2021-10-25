import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatBE,
  getDrivingFaultsCatBE,
  getNonStandardFaultsCatBE,
  getSeriousFaultsCatBE,
  getVehicleChecksFaultCatBE,
} from '../fault-provider-cat-be';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-be', () => {
  describe('getVehicleChecksFaultCatBE', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        },
        {
          code: 'S02',
          description: 'S02',
          outcome: CompetencyOutcome.DF,
        },
        {
          code: 'S03',
          description: 'S03',
          outcome: CompetencyOutcome.DF,
        }],
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        },
        {
          code: 'T02',
          description: 'T02',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const data: CatBEUniqueTypes.TestData = {
        vehicleChecks,
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
      const result: Fault[] = getSeriousFaultsCatBE(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };

      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return ', () => {
      const data: CatBEUniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatBE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatBE', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatBEUniqueTypes.TestData = {
        dangerousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
        manoeuvres: {
          reverseLeft: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
      };

      const result: Fault [] = getDangerousFaultsCatBE(data);

      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatBE', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatBEUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatBE(data);

      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should give us an eyesight fault if test data contains a serious eyesight fault', () => {
      const result: Fault [] = getSeriousFaultsCatBE({
        eyesightTest: {
          seriousFault: true,
          complete: true,
          faultComments: 'Eyesight test comment',
        },
      });

      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.eyesightTest, count: 1 });
    });
  });

  describe('getDrivingFaultsCatBE', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatBEUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatBE(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatBE', () => {
    it('should return the uncouple competency when fault type is same to fault passed in and it was selected', () => {
      const data: CatBEUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: true,
        },
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatBE(data, CompetencyOutcome.DF);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
    });

    it('should return an empty array when the selected value is false', () => {
      const data: CatBEUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: false,
        },
      };
      const result: Fault[] = getNonStandardFaultsCatBE(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
