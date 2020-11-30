import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatD1,
  getDrivingFaultsCatD1,
  getNonStandardFaultsCatD1,
  getSeriousFaultsCatD1,
  getVehicleChecksFaultCatD1,
} from '../fault-provider-cat-d1';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-d1', () => {
  describe('getVehicleChecksFaultCatD1', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatD1UniqueTypes.VehicleChecks = {
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
      const data: CatD1UniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatD1(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatD1UniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatD1', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatD1UniqueTypes.TestData = {
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
        pcvDoorExercise: {
          dangerousFault: true,
        },
      };
      const result: Fault [] = getDangerousFaultsCatD1(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.pcvDoorExercise, count: 1 });
    });
  });

  describe('getSeriousFaultsCatD1', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatD1UniqueTypes.TestData = {
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
        pcvDoorExercise: {
          seriousFault: true,
        },
      };

      const result: Fault [] = getSeriousFaultsCatD1(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.pcvDoorExercise, count: 1 });
    });
  });

  describe('getDrivingFaultsCatD1', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatD1UniqueTypes.TestData = {
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
        pcvDoorExercise: {
          drivingFault: true,
        },
      };
      const result: Fault [] = getDrivingFaultsCatD1(data);

      expect(result.length).toBe(3);
      expect(result).toEqual([
                               { name: Competencies.ancillaryControls, count: 1 },
                               { name: Competencies.reverseLeftControl, count: 1 },
                               { name: Competencies.pcvDoorExercise, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatD1', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatD1UniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
        pcvDoorExercise: {},
      };
      const result: Fault[] = getNonStandardFaultsCatD1(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
