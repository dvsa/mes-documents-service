import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { ICustomPropertyProvider, CustomPropertyProvider } from '../custom-property-provider';
import { completedCatBTest } from '../../../framework/__mocks__/test-data.mock';
import { englishCompetencyLabels, welshCompetencyLabels } from '../../../domain/competencies';

describe('personalisation-provider', () => {

  let faultProvider: IFaultProvider;
  let customPropertyProvider: ICustomPropertyProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();
    customPropertyProvider = new CustomPropertyProvider();

    if (completedCatBTest.communicationPreferences) {
      completedCatBTest.communicationPreferences.conductedLanguage = 'English';
    }
  });

  describe('getPersonalisationDetails', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const result = personalisationProvider.getPersonalisationDetails(completedCatBTest);

      expect(result.applicationReference).toBe(12345671011);
      expect(result.category).toBe('B');
      expect(result.date).toBe('31 July 2019');
      expect(result.location).toBe('Test Centre 001');

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.ancillaryControls}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}, 2`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlsSteering}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}, 3`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.controlledStop}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkControl}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.reverseParkCarparkObservation}, 1`);

      // Extra Checks to make sure order is correct
      expect(result.drivingFaults[0]).toContain('3');
      expect(result.drivingFaults[1]).toContain('2');
      expect(result.drivingFaults[2]).toContain('1');

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.ancillaryControls}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.awarenessPlanning}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseParkRoadObservation}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.controlsSteering}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.signalsCorrectly}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);

      expect(result.showDrivingFaults).toEqual(true);
      expect(result.showSeriousFaults).toEqual(true);
      expect(result.showDangerousFaults).toEqual(true);
      expect(result.showEcoText).toBe(false);
      expect(result.showEtaText).toEqual(true);
      expect(result.showEtaVerbal).toEqual(true);
      expect(result.showEtaPhysical).toEqual(false);

      expect(result.showProvLicenceRetainedByDriver).toEqual(false);
      expect(result.showProvLicenceRetainedByDvsa).toEqual(true);
    });
    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      if (completedCatBTest.communicationPreferences) {
        completedCatBTest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getPersonalisationDetails(completedCatBTest);

      expect(result.drivingFaults.length).toBe(7);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.ancillaryControls}, 1`);

      expect(result.seriousFaults.length).toBe(4);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.ancillaryControls}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.controlsSteering}`);
    });
  });

  describe('getTitledName function', () => {
    it('should return the full name with title if title is present', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const name = {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = personalisationProvider.getTitledName(name);

      expect(result).toBe('Mr John Doe');
    });

    it('should return the full name without title if title is not present', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const name = {
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = personalisationProvider.getTitledName(name);

      expect(result).toBe('John Doe');
    });

    it('should return an empty string if name is undefined', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const result = personalisationProvider.getTitledName(undefined);

      expect(result).toBe('');
    });
  });

});
