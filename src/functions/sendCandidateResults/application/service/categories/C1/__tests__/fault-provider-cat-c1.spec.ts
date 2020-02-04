import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatC1,
  getDrivingFaultsCatC1,
  getNonStandardFaultsCatC1,
  getSeriousFaultsCatC1,
  getVehicleChecksFaultCatC1,
} from '../fault-provider-cat-c1';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-c1', () => {
  describe('getVehicleChecksFaultCatC1', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatC1UniqueTypes.VehicleChecks = {
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
      const data: CatC1UniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatC1(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatC1UniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatC1', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatC1UniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatC1(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatC1', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatC1UniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatC1(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatC1', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatC1UniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatC1(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatC1', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatC1UniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatC1(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
