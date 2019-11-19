import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import {
  getDangerousFaultsCatB,
  getDrivingFaultsCatB,
  getSeriousFaultsCatB,
  getVehicleChecksFaultCatB,
} from '../fault-provider-cat-b';
import { Competencies } from '../../../../../domain/competencies';

describe('fault-provider-cat-b', () => {
  describe('getVehicleChecksFaultCatB', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.D,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.D);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });

    });
    it('should not find a dangerous fault if one exists', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.D);

      expect(result.length).toBe(0);

    });
    it('should find a serious fault if one exists', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.S,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.S);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });

    });
    it('should not find a serious fault if one exists', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.S);

      expect(result.length).toBe(0);

    });
    it('should find a driving fault if one exists', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.DF);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });

    });
    it('should not find a serious fault if one exists', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.S,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.DF);

      expect(result.length).toBe(0);

    });
    it('should only return one a driving fault if two exist', () => {
      const data: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
        tellMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFaultCatB(data, CompetencyOutcome.DF);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.vehicleChecks, count: 1 });

    });
  });

  describe('getDangerousFaultsCatB', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatBUniqueTypes.TestData = {
        dangerousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.D,
        },
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
      };

      const result: Fault [] = getDangerousFaultsCatB(data);

      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.controlledStop, count: 1 });
      expect(result).toContain({ name: Competencies.forwardParkControl, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });

    });
  });

  describe('getSeriousFaultsCatB', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatBUniqueTypes.TestData = {
        seriousFaults: {
          ancillaryControls: true,
          awarenessPlanning: false,
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.S,
        },
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.S,
          },
        },
      };

      const result: Fault [] = getSeriousFaultsCatB(data);

      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.controlledStop, count: 1 });
      expect(result).toContain({ name: Competencies.forwardParkControl, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });

    });

    it('should give us an eyesight fault if test data contains a serious eyesight fault', () => {
      const result: Fault [] = getSeriousFaultsCatB({
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

  describe('getDrivingFaultsCatB', () => {
    it('should give us a list of faults from different sections of the test data', () => {
      const data: CatBUniqueTypes.TestData = {
        drivingFaults: {
          ancillaryControls: 1,
          awarenessPlanning: 0,
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.DF,
        },
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.DF,
          },
        },
      };

      const result: Fault [] = getDrivingFaultsCatB(data);

      expect(result.length).toBe(3);
      expect(result).toContain({ name: Competencies.controlledStop, count: 1 });
      expect(result).toContain({ name: Competencies.forwardParkControl, count: 1 });
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });

    });
  });
});
