import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatDE,
  getDrivingFaultsCatDE,
  getNonStandardFaultsCatDE,
  getSeriousFaultsCatDE,
  getVehicleChecksFaultCatDE,
} from '../fault-provider-cat-de';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-de', () => {
  describe('getVehicleChecksFaultCatDE', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatDEUniqueTypes.VehicleChecks = {
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
        fullLicenceHeld: true,
      };
      const data: CatDEUniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatDE(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
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
        fullLicenceHeld: true,
      };

      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return one driving fault with a count of two if two exist when no full licence held', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
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
        fullLicenceHeld: false,
      };

      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatDEUniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatDE(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatDE', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatDEUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatDE(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.pcvDoorExercise, count: 1 });
    });
  });

  describe('getSeriousFaultsCatDE', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatDEUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatDE(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
      expect(result).toContain({ name: Competencies.pcvDoorExercise, count: 1 });
    });
  });

  describe('getDrivingFaultsCatDE', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatDEUniqueTypes.TestData = {
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
        safetyQuestions: {
          questions: [
            {
              description: 'Safety Question1',
              outcome: 'DF',
            },
          ],
        },
      };
      const result: Fault [] = getDrivingFaultsCatDE(data);

      expect(result.length).toBe(4);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
        { name: Competencies.safetyQuestions, count: 1 },
        { name: Competencies.pcvDoorExercise, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatDE', () => {
    it('should return the uncouple competency when fault type is same to fault passed in and it was selected', () => {
      const data: CatDEUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: true,
        },
        vehicleChecks: {},
        manoeuvres: {},
        pcvDoorExercise: {},
        safetyQuestions: {},
      };
      const result: Fault[] = getNonStandardFaultsCatDE(data, CompetencyOutcome.DF);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
    });

    it('should return an empty array when the selected value is false', () => {
      const data: CatDEUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: false,
        },
        pcvDoorExercise: {},
        safetyQuestions: {},
      };
      const result: Fault[] = getNonStandardFaultsCatDE(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
