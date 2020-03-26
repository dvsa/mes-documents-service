import { DrivingFaults, QuestionOutcome, QuestionResult, SeriousFaults } from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  convertNumericFaultObjectToArray,
  convertBooleanFaultObjectToArray,
  getCompletedManoeuvres,
  FaultProvider, getVehicleCheckFaultCount,
} from '../fault-provider';
import { Fault } from '../../../domain/fault';
import { CompetencyOutcome } from '../../../domain/competency-outcome';
import { Competencies } from '../../../domain/competencies';

import * as catBFaultProvider from '../categories/B/fault-provider-cat-b';
import * as catBEFaultProvider from '../categories/BE/fault-provider-cat-be';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';

describe('fault-provider', () => {

  describe('FaultProvider', () => {
    let faultProvider: FaultProvider;

    beforeEach(() => {
      faultProvider = new FaultProvider();
    });

    describe('getDrivingFaults', () => {
      it('should call the cat b driving faults method when category is b', () => {
        spyOn(catBFaultProvider, 'getDrivingFaultsCatB');

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

        faultProvider.getDrivingFaults(data, TestCategory.B);
        expect(catBFaultProvider.getDrivingFaultsCatB).toHaveBeenCalledWith(data);
      });

      it('should call the cat be driving faults method when category is be', () => {
        spyOn(catBEFaultProvider, 'getDrivingFaultsCatBE');
        const data = {};
        faultProvider.getDrivingFaults(data, TestCategory.BE);
        expect(catBEFaultProvider.getDrivingFaultsCatBE).toHaveBeenCalledWith(data);
      });

      it('should call the cat b driving faults as default', () => {
        spyOn(catBFaultProvider, 'getDrivingFaultsCatB');

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

        faultProvider.getDrivingFaults(data, '');
        expect(catBFaultProvider.getDrivingFaultsCatB).toHaveBeenCalledWith(data);
      });
    });

    describe('getSeriousFaults', () => {
      it('should call the cat b serious faults method when category is b', () => {
        spyOn(catBFaultProvider, 'getSeriousFaultsCatB');

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

        faultProvider.getSeriousFaults(data, TestCategory.B);
        expect(catBFaultProvider.getSeriousFaultsCatB).toHaveBeenCalledWith(data);
      });

      it('should call the cat be serious faults method when category is be', () => {
        spyOn(catBEFaultProvider, 'getSeriousFaultsCatBE');
        const data = {};
        faultProvider.getSeriousFaults(data, TestCategory.BE);
        expect(catBEFaultProvider.getSeriousFaultsCatBE).toHaveBeenCalledWith(data);
      });

      it('should call the cat b serious faults as default', () => {
        spyOn(catBFaultProvider, 'getSeriousFaultsCatB');
        const data = {};
        faultProvider.getSeriousFaults(data, '');
        expect(catBFaultProvider.getSeriousFaultsCatB).toHaveBeenCalledWith(data);
      });
    });

    describe('getDangerousFaults', () => {
      it('should call the cat b dangerous faults method when category is b', () => {
        spyOn(catBFaultProvider, 'getDangerousFaultsCatB');

        const data: any = {
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

        faultProvider.getDangerousFaults(data, TestCategory.B);
        expect(catBFaultProvider.getDangerousFaultsCatB).toHaveBeenCalledWith(data);
      });

      it('should call the cat be dangerous faults method when category is be', () => {
        spyOn(catBEFaultProvider, 'getDangerousFaultsCatBE');

        const data: any = {
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

        faultProvider.getDangerousFaults(data, TestCategory.BE);
        expect(catBEFaultProvider.getDangerousFaultsCatBE).toHaveBeenCalledWith(data);
      });

      it('should call the cat b dangerous faults as default', () => {
        spyOn(catBFaultProvider, 'getDangerousFaultsCatB');

        const data: any = {
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

        faultProvider.getDangerousFaults(data, '');
        expect(catBFaultProvider.getDangerousFaultsCatB).toHaveBeenCalledWith(data);
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
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 5 });
      expect(result).toContain({ name: Competencies.awarenessPlanning, count: 2 });
      expect(result).toContain({ name: Competencies.clearance, count: 3 });

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
      expect(result).toContain({ name: Competencies.ancillaryControls, count: 1 });
      expect(result).toContain({ name: Competencies.awarenessPlanning, count: 1 });
      expect(result).toContain({ name: Competencies.clearance, count: 1 });

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
      const data: CatBUniqueTypes.Manoeuvres = {
        forwardPark: {
          selected: true,
          controlFault: CompetencyOutcome.DF,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(2);
      expect(result).toContain({ name: Competencies.forwardParkControl, count: 1 });
      expect(result).toContain({ name: Competencies.forwardParkObservation, count: 1 });

    });
    it('should not return any driving faults for a manoeuvre if selected is not true', () => {
      const data: CatBUniqueTypes.Manoeuvres = {
        forwardPark: {
          controlFault: CompetencyOutcome.DF,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(0);

    });
    it('should only return driving faults for the type of fault we have requested', () => {
      const data: CatBUniqueTypes.Manoeuvres = {
        forwardPark: {
          selected: true,
          controlFault: CompetencyOutcome.S,
          observationFault: CompetencyOutcome.DF,
        },
      };

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(1);
      expect(result).toContain({ name: Competencies.forwardParkObservation, count: 1 });

    });
    it('should return faults for multiple manoeuvres if more then 1 exist', () => {
      const data: CatBUniqueTypes.Manoeuvres = {
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
      expect(result).toContain({ name: Competencies.forwardParkControl, count: 1 });
      expect(result).toContain({ name: Competencies.reverseParkCarparkObservation, count: 1 });

    });
    it('should return any empty array if no data is avalible', () => {
      const data: CatBUniqueTypes.Manoeuvres = {};

      const result: Fault[] = getCompletedManoeuvres(data, CompetencyOutcome.DF);

      expect(result.length).toBe(0);

    });
  });

  describe('getVehicleCheckFaultCount', () => {
    it('should return 0 when no vehicle checks are present', () => {
      const data: CatFUniqueTypes.VehicleChecks = {};
      const count: number = getVehicleCheckFaultCount(data, CompetencyOutcome.DF);
      expect(count).toEqual(0);
    });

    it('should return a count of 2 as there are two DF present in the showMeQuestions', () => {
      const data: CatFUniqueTypes.VehicleChecks = {
        showMeQuestions: [
          {
            outcome: 'DF',
          },
          {
            outcome: 'P',
          },
          {
            outcome: 'DF',
          },
        ],
      };
      const count: number = getVehicleCheckFaultCount(data, CompetencyOutcome.DF);
      expect(count).toEqual(2);
    });

    it('should return a count of 2 as there are two DF present in the tellMeQuestions', () => {
      const data: CatFUniqueTypes.VehicleChecks = {
        tellMeQuestions: [
          {
            outcome: 'DF',
          },
          {
            outcome: 'P',
          },
          {
            outcome: 'DF',
          },
        ],
      };
      const count: number = getVehicleCheckFaultCount(data, CompetencyOutcome.DF);
      expect(count).toEqual(2);
    });

    it('should return a count of 4 as there are two DF present in the showMeQuestions & tellMeQuestions', () => {
      const data: CatFUniqueTypes.VehicleChecks = {
        showMeQuestions: [
          {
            outcome: 'DF',
          },
          {
            outcome: 'P',
          },
          {
            outcome: 'DF',
          },
        ],
        tellMeQuestions: [
          {
            outcome: 'DF',
          },
          {
            outcome: 'P',
          },
          {
            outcome: 'DF',
          },
        ],
      };
      const count: number = getVehicleCheckFaultCount(data, CompetencyOutcome.DF);
      expect(count).toEqual(4);
    });
  });
});
