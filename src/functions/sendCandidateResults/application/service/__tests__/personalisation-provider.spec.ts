import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { completedCatBTest } from '../../../framework/__mocks__/test-data.mock';
import { englishCompetencyLabels, welshCompetencyLabels } from '../../../domain/competencies';
import { BooleanText } from '../../../domain/personalisation.model';

describe('personalisation-provider', () => {

  let faultProvider: IFaultProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();

    if (completedCatBTest.communicationPreferences) {
      completedCatBTest.communicationPreferences.conductedLanguage = 'English';
    }
  });

  describe('getEmailPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      const result = personalisationProvider.getEmailPersonalisation(completedCatBTest);

      expect(result.applicationReference).toBe(12345671011);
      expect(result.category).toBe('B');
      expect(result.date).toBe('31 July 2019');
      expect(result.location).toBe('Test Centre 001');

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.ancillaryControls}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlsSteering}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlledStop}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkControl}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkObservation}, 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.ancillaryControls}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadObservation}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.controlsSteering}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);

      expect(result.showDrivingFaults).toEqual(BooleanText.YES);
      expect(result.showSeriousFaults).toEqual(BooleanText.YES);
      expect(result.showDangerousFaults).toEqual(BooleanText.YES);
      expect(result.showEcoText).toBe(BooleanText.NO);
    });
    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      if (completedCatBTest.communicationPreferences) {
        completedCatBTest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getEmailPersonalisation(completedCatBTest);

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.ancillaryControls}, 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.ancillaryControls}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.controlsSteering}`);
    });
  });

  describe('getLetterPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      const result = personalisationProvider.getLetterPersonalisation(completedCatBTest);

      expect(result.applicationReference).toBe(12345671011);
      expect(result.address_line_1).toBe('Mr Joe Bloggs');
      expect(result.address_line_2).toBe('The Occupier');
      expect(result.address_line_3).toBe('123 High Street');
      expect(result.address_line_4).toBe('Richmond upon Thames');
      expect(result.address_line_5).toBe('London');
      expect(result.address_line_6).toBe('Middlesex');
      expect(result.postcode).toBe('SW14 6BH');

      expect(result.category).toBe('B');
      expect(result.date).toBe('31 July 2019');
      expect(result.location).toBe('Test Centre 001');

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.ancillaryControls}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlsSteering}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlledStop}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkControl}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkObservation}, 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.ancillaryControls}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadObservation}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.controlsSteering}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);

      expect(result.showDrivingFaults).toEqual(BooleanText.YES);
      expect(result.showSeriousFaults).toEqual(BooleanText.YES);
      expect(result.showDangerousFaults).toEqual(BooleanText.YES);
      expect(result.showEcoText).toBe(BooleanText.NO);
    });

    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      if (completedCatBTest.communicationPreferences) {
        completedCatBTest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getLetterPersonalisation(completedCatBTest);

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.ancillaryControls}, 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.ancillaryControls}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.controlsSteering}`);
    });
  });
});
