import {
  getDangerousFaultsCatADI2,
  getDrivingFaultsCatADI2,
  getManoeuvresFaultsCatADI2,
  getSeriousFaultsCatADI2,
} from '../fault-provider-cat-adi-pt2';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import Manoeuvres = CatADI2UniqueTypes.Manoeuvres;
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';
import { Fault } from '../../../../../domain/fault';
import { Competencies } from '../../../../../domain/competencies';

describe('Cat ADI 2 Fault Provider', () => {
  describe('getManoeuvresFaultsCatADI2', () => {
    const manoeuvres: Manoeuvres[] = [
      {
        reverseRight: {
          selected: true,
          controlFault: 'DF',
          observationFault: 'S',
        },
      },
      {
        reverseParkRoad: {
          selected: true,
          controlFault: 'DF',
          observationFault: 'D',
        },
      },
    ];
    it('should get standard manoeuvre driving faults', () => {
      const drivingFaults: Fault[] = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.DF);
      const expectedDrivingFaults = [
        { name: 'reverseRightControl' as Competencies, count: 1 },
        { name: 'reverseParkRoadControl' as Competencies, count: 1 },
      ];
      expect(drivingFaults).toEqual(expectedDrivingFaults);
    });
    it('should get serious manoeuvre driving faults', () => {
      const seriousFaults: Fault[] = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.S);
      const expectedSeriousFaults = [
        { name: 'reverseRightObservation' as Competencies, count: 1 },
      ];
      expect(seriousFaults).toEqual(expectedSeriousFaults);
    });
    it('should get dangerous manoeuvre driving faults', () => {
      const seriousFaults: Fault[] = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.D);
      const expectedDangerousFaults = [
        { name: 'reverseParkRoadObservation' as Competencies, count: 1 },
      ];
      expect(seriousFaults).toEqual(expectedDangerousFaults);
    });

    it('should return empty array for empty manoeuvres', () => {
      const manoeuvres = [{}, {}];
      const faults: Fault[] = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.D);
      expect(faults).toEqual([]);
    });

  });
  describe('getDrivingFaultsCatADI2', () => {
    it('should return all standard and non standard driving faults', () => {
      const testData: CatADI2UniqueTypes.TestData = {
        drivingFaults: {
          useOfMirrorsSignalling: 2,
          junctionsApproachSpeed: 1,
          positionNormalStops: 1,
        },
        manoeuvres: [
          {
            reverseRight: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
          {
            forwardPark: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        ],
        vehicleChecks: {
          showMeQuestions: [
            {
              code: 'A15',
              description: 'Front windscreen',
              outcome: 'DF',

            },
            {
              code: 'A16',
              description: 'Dipped headlights',
              outcome: 'P',

            }],
          tellMeQuestions: [{
            code: 'T2',
            description: 'Tyre pressures',
            outcome: 'DF',
          }, {
            code: 'T10',
            description: 'Rear fog light(s)',
            outcome: 'DF',

          }, {
            code: 'T11',
            description: 'Dipped to main beam',
            outcome: 'DF',

          }],
        },
        controlledStop: {
          selected: true,
          fault: 'DF',
        },
      };
      const drivingFaults = getDrivingFaultsCatADI2(testData);
      const expectedDrivingFaults = [
        { name: Competencies.useOfMirrorsSignalling, count:2 },
        { name: Competencies.junctionsApproachSpeed, count:1 },
        { name: Competencies.positionNormalStops, count:1 },
        { name: Competencies.vehicleChecks, count:4 },
        { name: Competencies.controlledStop, count:1 },
        { name: Competencies.reverseRightControl, count:1 },
        { name: Competencies.reverseRightObservation, count:1 },
        { name: Competencies.forwardParkControl, count:1 },
        { name: Competencies.forwardParkObservation, count:1 },
      ];
      expect(drivingFaults).toEqual(expectedDrivingFaults);
    });
  });
  describe('getSeriousFaultsCatADI2', () => {
    it('should return all serious driving faults', () => {
      const testData: CatADI2UniqueTypes.TestData = {
        eyesightTest: {
          complete: true,
          seriousFault: true,
          faultComments: 'failed',
        },
        seriousFaults: {
          useOfMirrorsSignalling: true,
          junctionsApproachSpeed: true,
        },
        manoeuvres: [
          {
            reverseRight: {
              selected: true,
              controlFault: 'S',
              observationFault: 'DF',
            },
          },
          {
            forwardPark: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        ],
        vehicleChecks: {
          showMeQuestions: [
            {
              code: 'A15',
              description: 'Front windscreen',
              outcome: 'S',

            },
            {
              code: 'A16',
              description: 'Dipped headlights',
              outcome: 'P',

            }],
          tellMeQuestions: [{
            code: 'T2',
            description: 'Tyre pressures',
            outcome: 'DF',
          }, {
            code: 'T10',
            description: 'Rear fog light(s)',
            outcome: 'DF',

          }, {
            code: 'T11',
            description: 'Dipped to main beam',
            outcome: 'DF',

          }],
        },
        controlledStop: {
          selected: true,
          fault: 'S',
        },
      };
      const expectedSeriousFaults = [
        { name: Competencies.useOfMirrorsSignalling, count: 1 },
        { name: Competencies.junctionsApproachSpeed, count: 1 },
        { name: Competencies.vehicleChecks, count: 1 },
        { name: Competencies.controlledStop, count: 1 },
        { name: Competencies.reverseRightControl, count: 1 },
        { name: Competencies.eyesightTest, count: 1 }];
      const seriousFaults = getSeriousFaultsCatADI2(testData);
      expect(seriousFaults).toEqual(expectedSeriousFaults);
    });
  });
  describe('getDangerousFaultsCatADI2', () => {
    it('should return all dangerous driving faults', () => {
      const testData: CatADI2UniqueTypes.TestData = {
        dangerousFaults: {
          useOfMirrorsSignalling: true,
          junctionsApproachSpeed: true,
          positionNormalStops: true,
        },
        manoeuvres: [
          {
            reverseRight: {
              selected: true,
              controlFault: 'D',
              observationFault: 'D',
            },
          },
          {
            forwardPark: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        ],
        vehicleChecks: {
          showMeQuestions: [
            {
              code: 'A15',
              description: 'Front windscreen',
              outcome: 'D',

            },
            {
              code: 'A16',
              description: 'Dipped headlights',
              outcome: 'P',

            }],
          tellMeQuestions: [{
            code: 'T2',
            description: 'Tyre pressures',
            outcome: 'DF',
          }, {
            code: 'T10',
            description: 'Rear fog light(s)',
            outcome: 'DF',

          }, {
            code: 'T11',
            description: 'Dipped to main beam',
            outcome: 'DF',

          }],
        },
        controlledStop: {
          selected: true,
          fault: 'D',
        },
      };
      const dangerousFaults = getDangerousFaultsCatADI2(testData);
      const expectedDangerousFaults = [
        { name: Competencies.useOfMirrorsSignalling, count:1 },
        { name: Competencies.junctionsApproachSpeed, count:1 },
        { name: Competencies.positionNormalStops, count:1 },
        { name: Competencies.vehicleChecks, count:1 },
        { name: Competencies.controlledStop, count:1 },
        { name: Competencies.reverseRightControl, count:1 },
        { name: Competencies.reverseRightObservation, count:1 }];
      expect(dangerousFaults).toEqual(expectedDangerousFaults);

    });
  });
});
