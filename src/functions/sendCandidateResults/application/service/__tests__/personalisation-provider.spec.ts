import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { completedCatBTest } from '../../../framework/__mocks__/test-data.mock';
import { englishCompetencyLabels } from '../../../domain/competencies';

describe('personalisation-provider', () => {

  let faultProvider: IFaultProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();
  });

  describe('getEmailPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      const result = personalisationProvider.getEmailPersonalisation(completedCatBTest);

      expect(result.applicationReference).toBe('1234567890');
      expect(result.category).toBe('B');
      expect(result.date).toBe('09:00');
      expect(result.firstName).toBe('Joe');
      expect(result.lastName).toBe('Bloggs');
      expect(result.driverNumber).toBe('ABC 12345 EFG');

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.ancillaryControls} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.awarenessPlanning} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlsSteering} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.signalsCorrectly} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlledStop} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkControl} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkObservation} - 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.ancillaryControls}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadObservation}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.controlsSteering}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);
    });
  });

  describe('getLetterPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      const result = personalisationProvider.getLetterPersonalisation(completedCatBTest);

      expect(result.address_line_1).toBe('Mr Joe Bloggs');
      expect(result.address_line_2).toBe('The Occupier');
      expect(result.address_line_3).toBe('123 High Street');
      expect(result.address_line_4).toBe('Richmond upon Thames');
      expect(result.address_line_5).toBe('London');
      expect(result.address_line_6).toBe('Middlesex');
      expect(result.postcode).toBe('SW14 6BH');

      expect(result.applicationReference).toBe('1234567890');
      expect(result.category).toBe('B');
      expect(result.date).toBe('09:00');
      expect(result.firstName).toBe('Joe');
      expect(result.lastName).toBe('Bloggs');
      expect(result.driverNumber).toBe('ABC 12345 EFG');

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.ancillaryControls} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.awarenessPlanning} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlsSteering} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.signalsCorrectly} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlledStop} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkControl} - 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkObservation} - 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.ancillaryControls}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadObservation}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.controlsSteering}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);
    });
  });
});
