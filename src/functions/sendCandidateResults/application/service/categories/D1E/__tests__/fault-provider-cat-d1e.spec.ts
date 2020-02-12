import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatD1E,
  getDrivingFaultsCatD1E,
  getNonStandardFaultsCatD1E,
  getSeriousFaultsCatD1E,
  getVehicleChecksFaultCatD1E,
} from '../fault-provider-cat-d1e';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-d1e', () => {
  describe('getVehicleChecksFaultCatD1E', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatD1EUniqueTypes.VehicleChecks = {
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
      const data: CatD1EUniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatD1E(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatD1EUniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatD1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatD1E', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatD1EUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatD1E(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatD1E', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatD1EUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatD1E(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatD1E', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatD1EUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatD1E(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
                               { name: Competencies.ancillaryControls, count: 1 },
                               { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatD1E', () => {
    it('should return the uncouple competency when fault type is same to fault passed in and it was selected', () => {
      const data: CatD1EUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: true,
        },
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatD1E(data, CompetencyOutcome.DF);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
    });

    it('should return an empty array when the selected value is false', () => {
      const data: CatD1EUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: false,
        },
      };
      const result: Fault[] = getNonStandardFaultsCatD1E(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
