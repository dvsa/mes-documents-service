import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatD,
  getDrivingFaultsCatD,
  getNonStandardFaultsCatD,
  getSeriousFaultsCatD,
  getVehicleChecksFaultCatD,
} from '../fault-provider-cat-d';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-d', () => {
  describe('getVehicleChecksFaultCatD', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatDUniqueTypes.VehicleChecks = {
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
      const data: CatDUniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatD(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatDUniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatD', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatDUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatD(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.pcvDoorExercise, count: 1 });
    });
  });

  describe('getSeriousFaultsCatD', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatDUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatD(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.pcvDoorExercise, count: 1 });
    });
  });

  describe('getDrivingFaultsCatD', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatDUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatD(data);

      expect(result.length).toBe(3);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
        { name: Competencies.pcvDoorExercise, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatD', () => {
    it('should return an empty array when no faults recorded', () => {
      const data: CatDUniqueTypes.TestData = {
        vehicleChecks: {},
        manoeuvres: {},
        pcvDoorExercise: {},
      };
      const result: Fault[] = getNonStandardFaultsCatD(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
