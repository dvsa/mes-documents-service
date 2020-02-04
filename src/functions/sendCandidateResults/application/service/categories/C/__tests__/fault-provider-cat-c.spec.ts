import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatC,
  getDrivingFaultsCatC,
  getNonStandardFaultsCatC,
  getSeriousFaultsCatC,
  getVehicleChecksFaultCatC,
} from '../fault-provider-cat-c';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-c', () => {
  describe('getVehicleChecksFaultCatC', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatCUniqueTypes.VehicleChecks = {
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
      const data: CatCUniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatC(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatCUniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatC', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatCUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatC(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatC', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatCUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatC(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatC', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatCUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatC(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatC', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatCUniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatC(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
