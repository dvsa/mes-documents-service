import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatC1E,
  getDrivingFaultsCatC1E,
  getNonStandardFaultsCatC1E,
  getSeriousFaultsCatC1E,
  getVehicleChecksFaultCatC1E,
} from '../fault-provider-cat-c1e';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-c1e', () => {
  describe('getVehicleChecksFaultCatC1E', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.D,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.D);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a dangerous fault if none exists', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.D);
      expect(result.length).toBe(0);
    });

    it('should find a serious fault if one exists', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.S,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.S);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should not find a serious fault if none exist', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.S);
      expect(result.length).toBe(0);
    });

    it('should find a driving fault if one exists', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
        showMeQuestions: [{
          code: 'S01',
          description: 'S01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return a serious fault when 5 vehicle check driving faults', () => {
      const vehicleChecks: CatC1EUniqueTypes.VehicleChecks = {
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
      const data: CatC1EUniqueTypes.TestData = {
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
      const result: Fault[] = getSeriousFaultsCatC1E(data);
      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });

    it('should only return one driving fault with a count of two if two exist when full licence held', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });

    it('should return one driving fault with a count of two if two exist when no full licence held', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
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

      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 2 });
    });

    it('should return one driving fault with a count of 1', () => {
      const data: CatC1EUniqueTypes.VehicleChecks = {
        tellMeQuestions: [{
          code: 'T01',
          description: 'T01',
          outcome: CompetencyOutcome.DF,
        }],
      };
      const result: Fault[] = getVehicleChecksFaultCatC1E(data, CompetencyOutcome.DF);
      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });
    });
  });

  describe('getDangerousFaultsCatC1E', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatC1EUniqueTypes.TestData = {
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
      const result: Fault [] = getDangerousFaultsCatC1E(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getSeriousFaultsCatC1E', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatC1EUniqueTypes.TestData = {
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

      const result: Fault [] = getSeriousFaultsCatC1E(data);
      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.reverseLeftControl, count: 1 });
    });
  });

  describe('getDrivingFaultsCatC1E', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatC1EUniqueTypes.TestData = {
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
      const result: Fault [] = getDrivingFaultsCatC1E(data);

      expect(result.length).toBe(2);
      expect(result).toEqual([
        { name: Competencies.ancillaryControls, count: 1 },
        { name: Competencies.reverseLeftControl, count: 1 },
      ]);
    });
  });

  describe('getNonStandardFaultsCatC1E', () => {
    it('should return the uncouple competency when fault type is same to fault passed in and it was selected', () => {
      const data: CatC1EUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: true,
        },
        vehicleChecks: {},
        manoeuvres: {},
      };
      const result: Fault[] = getNonStandardFaultsCatC1E(data, CompetencyOutcome.DF);
      expect(result).toContain({ name: Competencies.uncoupleRecouple, count: 1 });
    });

    it('should return an empty array when the selected value is false', () => {
      const data: CatC1EUniqueTypes.TestData = {
        uncoupleRecouple: {
          fault: 'DF',
          faultComments: 'some comment',
          selected: false,
        },
      };
      const result: Fault[] = getNonStandardFaultsCatC1E(data, CompetencyOutcome.DF);
      expect(result).toEqual([]);
    });
  });
});
