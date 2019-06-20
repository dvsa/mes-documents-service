import {
    DrivingFaults,
    SeriousFaults,
    Manoeuvres,
    VehicleChecks,
    TestData,
} from '@dvsa/mes-test-schema/categories/B';
import {
    convertNumericFaultObjectToArray,
    convertBooleanFaultObjectToArray,
    getCompletedManoeuvres,
    getVehicleChecksFault,
    FaultProvider,
} from '../fault-provider';
import { Fault } from '../../../domain/fault';
import { CompetencyOutcome } from '../../../domain/competency-outcome';

describe('fault-provider', () => {

  describe('FaultProvider', () => {
    let faultProvider: FaultProvider;

    beforeEach(() => {
      faultProvider = new FaultProvider();
    });

    describe('getDrivingFaults', () => {
      it('should give us a list of faults from different sections of the test data', () => {
        const data: TestData = {
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

        const result: Fault [] = faultProvider.getDrivingFaults(data);

        expect(result.length).toBe(3);
        expect(result).toContain({ name: 'controlledStop', count: 1 });
        expect(result).toContain({ name: 'forwardParkControlFault', count: 1 });
        expect(result).toContain({ name: 'ancillaryControls', count: 1 });

      });
    });

    describe('getSeriousFaults', () => {
      it('should give us a list of faults from different sections of the test data', () => {
        const data: TestData = {
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

        const result: Fault [] = faultProvider.getSeriousFaults(data, '2');

        expect(result.length).toBe(3);
        expect(result).toContain({ name: 'controlledStop', count: 1 });
        expect(result).toContain({ name: 'forwardParkControlFault', count: 1 });
        expect(result).toContain({ name: 'ancillaryControls', count: 1 });

      });
      it('should give us an eyesight fault if activty code 3', () => {

        const result: Fault [] = faultProvider.getSeriousFaults(undefined, '3');

        expect(result.length).toBe(1);
        expect(result).toContain({ name: 'eyesightTest', count: 1 });

      });
    });

    describe('getDangerousFaults', () => {
      it('should give us a list of faults from different sections of the test data', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: false,
          },
          controlledStop: {
            selected: true,
            fault: CompetencyOutcome.D,
          },
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: CompetencyOutcome.D,
            },
          },
        };

        const result: Fault [] = faultProvider.getDangerousFaults(data);

        expect(result.length).toBe(3);
        expect(result).toContain({ name: 'controlledStop', count: 1 });
        expect(result).toContain({ name: 'forwardParkControlFault', count: 1 });
        expect(result).toContain({ name: 'ancillaryControls', count: 1 });

      });
    });

  });

  describe('convertNumericFaultObjectToArray', () => {
    it('should convert Driving Faults successfully', () => {
      const data: DrivingFaults = {
        ancillaryControls: 5,
        awarenessPlanning: 2,
        clearance: 3,
      };

      const result: Fault[] = convertNumericFaultObjectToArray(data);

      expect(result.length).toBe(3);
      expect(result).toContain({ name: 'ancillaryControls', count: 5 });
      expect(result).toContain({ name: 'awarenessPlanning', count: 2 });
      expect(result).toContain({ name: 'clearance', count: 3 });

    });
    it('should not transform any values which are not faults e.g. comments', () => {
      const data: DrivingFaults = {
        ancillaryControlsComments: '1234567',
      };

      const result: Fault[] = convertNumericFaultObjectToArray(data);

      expect(result.length).toBe(0);

    });
    it('should not transform any fault counts which are 0', () => {
      const data: DrivingFaults = {
        ancillaryControls: 0,
      };

      const result: Fault[] = convertNumericFaultObjectToArray(data);

      expect(result.length).toBe(0);

    });
  });

  describe('convertBooleanFaultObjectToArray', () => {
    it('should convert serious faults successfully', () => {
      const data: SeriousFaults = {
        ancillaryControls: true,
        awarenessPlanning: true,
        clearance: true,
      };

      const result: Fault[] = convertBooleanFaultObjectToArray(data);

      expect(result.length).toBe(3);
      expect(result).toContain({ name: 'ancillaryControls', count: 1 });
      expect(result).toContain({ name: 'awarenessPlanning', count: 1 });
      expect(result).toContain({ name: 'clearance', count: 1 });

    });
    it('should convert not transform values which are not faults eg Comments', () => {
      const data: SeriousFaults = {
        ancillaryControlsComments: '123456',
      };

      const result: Fault[] = convertBooleanFaultObjectToArray(data);

      expect(result.length).toBe(0);

    });
    it('should not transfer faults which are set as false', () => {
      const data: SeriousFaults = {
        ancillaryControls: false,
      };

      const result: Fault[] = convertBooleanFaultObjectToArray(data);

      expect(result.length).toBe(0);

    });
  });

  describe('getCompletedManoeuvres', () => {
    it('should return 2 driving faults if there are control and observation driving faults', () => {
      const data: Manoeuvres = {
        forwardPark: {
          selected: true,
          controlFault: CompetencyOutcome.DF,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(2);
      expect(result).toContain({ name: 'forwardParkControlFault', count: 1 });
      expect(result).toContain({ name: 'forwardParkObservationFault', count: 1 });

    });
    it('should not return any driving faults for a manoeuvre if selected is not true', () => {
      const data: Manoeuvres = {
        forwardPark: {
          controlFault: CompetencyOutcome.DF,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(0);

    });
    it('should only return driving faults for the type of fault we have requested', () => {
      const data: Manoeuvres = {
        forwardPark: {
          selected: true,
          controlFault: CompetencyOutcome.S,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: 'forwardParkObservationFault', count: 1 });

    });
    it('should return faults for multiple manoeuvres if more then 1 exist', () => {
      const data: Manoeuvres = {
        forwardPark: {
          selected: true,
          controlFault: CompetencyOutcome.DF,
        },
        reverseParkCarpark: {
          selected: true,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(2);
      expect(result).toContain({ name: 'forwardParkControlFault', count: 1 });
      expect(result).toContain({ name: 'reverseParkCarparkObservationFault', count: 1 });

    });
    it('should return any empty array if no data is avalible', () => {
      const data: Manoeuvres = {};

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(0);

    });
  });

  describe('getVehicleChecksFault', () => {
    it('should find a dangerous fault if one exists', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.D,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.D);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: 'vehicleChecks', count: 1 });

    });
    it('should not find a dangerous fault if one exists', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.D);

      expect(result.length).toBe(0);

    });
    it('should find a serious fault if one exists', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.S,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.S);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: 'vehicleChecks', count: 1 });

    });
    it('should not find a serious fault if one exists', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.S);

      expect(result.length).toBe(0);

    });
    it('should find a driving fault if one exists', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.DF);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: 'vehicleChecks', count: 1 });

    });
    it('should not find a serious fault if one exists', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.S,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.DF);

      expect(result.length).toBe(0);

    });
    it('should only return one a driving fault if two exist', () => {
      const data: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
        tellMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getVehicleChecksFault(data, CompetencyOutcome.DF);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: 'vehicleChecks', count: 1 });

    });
  });
});
