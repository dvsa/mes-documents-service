import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { ICustomPropertyProvider, CustomPropertyProvider } from '../custom-property-provider';
import { completedCatBETest } from '../../../framework/__mocks__/test-data.cat-be.mock';
import { englishCompetencyLabels, welshCompetencyLabels } from '../../../domain/competencies';
import { BooleanText } from '../../../domain/personalisation.model';

describe('personalisation-provider-cat-be', () => {

  let faultProvider: IFaultProvider;
  let customPropertyProvider: ICustomPropertyProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();
    customPropertyProvider = new CustomPropertyProvider();

    if (completedCatBETest.communicationPreferences) {
      completedCatBETest.communicationPreferences.conductedLanguage = 'English';
    }
  });

  describe('getEmailPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const result = personalisationProvider.getEmailPersonalisation(completedCatBETest);

      expect(result.applicationReference).toBe(12345671011);
      expect(result.category).toBe('B+E');
      expect(result.date).toBe('31 July 2019');
      expect(result.location).toBe('Test Centre 001');

      expect(result.drivingFaults.length).toBe(3);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.vehicleChecks}, 4`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.moveOffSafety}, 1`);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.moveOffControl}, 2`);

      // Extra Checks to make sure order is correct
      expect(result.drivingFaults[0]).toContain('4');

      expect(result.seriousFaults.length).toBe(5);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseLeftControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseLeftObservation}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.moveOffSafety}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.moveOffControl}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.uncoupleRecouple}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.moveOffSafety}`);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.moveOffControl}`);

      expect(result.showDrivingFaults).toEqual(BooleanText.YES);
      expect(result.showSeriousFaults).toEqual(BooleanText.YES);
      expect(result.showDangerousFaults).toEqual(BooleanText.YES);
      expect(result.showEcoText).toBe(BooleanText.NO);
      expect(result.showEtaText).toEqual(BooleanText.YES);
      expect(result.showEtaVerbal).toEqual(BooleanText.YES);
      expect(result.showEtaPhysical).toEqual(BooleanText.NO);
    });
    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      if (completedCatBETest.communicationPreferences) {
        completedCatBETest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getEmailPersonalisation(completedCatBETest);

      expect(result.drivingFaults.length).toBe(3);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.vehicleChecks}, 4`);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.moveOffSafety}, 1`);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.moveOffControl}, 2`);

      expect(result.seriousFaults.length).toBe(5);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.vehicleChecks}`);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.reverseLeftControl}`);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.reverseLeftObservation}`);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.moveOffSafety}`);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.moveOffControl}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.uncoupleRecouple}`);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.moveOffSafety}`);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.moveOffControl}`);
    });
  });

  describe('getLetterPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const result = personalisationProvider.getLetterPersonalisation(completedCatBETest);

      expect(result.applicationReference).toBe(12345671011);
      expect(result.address_line_1).toBe('Mr Joe Bloggs');
      expect(result.address_line_2).toBe('The Occupier');
      expect(result.address_line_3).toBe('123 High Street');
      expect(result.address_line_4).toBe('Richmond upon Thames');
      expect(result.address_line_5).toBe('London');
      expect(result.address_line_6).toBe('Middlesex');
      expect(result.postcode).toBe('SW14 6BH');

      expect(result.category).toBe('B+E');
      expect(result.date).toBe('31 July 2019');
      expect(result.location).toBe('Test Centre 001');

      expect(result.drivingFaults.length).toBe(3);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.vehicleChecks}, 4`);

      // Extra Checks to make sure order is correct
      expect(result.drivingFaults[0]).toContain('4');

      expect(result.seriousFaults.length).toBe(5);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseLeftControl}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseLeftObservation}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.uncoupleRecouple}`);

      expect(result.showDrivingFaults).toEqual(BooleanText.YES);
      expect(result.showSeriousFaults).toEqual(BooleanText.YES);
      expect(result.showDangerousFaults).toEqual(BooleanText.YES);
      expect(result.showEcoText).toBe(BooleanText.NO);
      expect(result.showEtaText).toEqual(BooleanText.YES);
      expect(result.showEtaVerbal).toEqual(BooleanText.YES);
      expect(result.showEtaPhysical).toEqual(BooleanText.NO);
    });

    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      if (completedCatBETest.communicationPreferences) {
        completedCatBETest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getLetterPersonalisation(completedCatBETest);

      expect(result.drivingFaults.length).toBe(3);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.vehicleChecks}, 4`);

      expect(result.seriousFaults.length).toBe(5);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.reverseLeftControl}`);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.reverseLeftObservation}`);
      expect(result.seriousFaults).toContain(`${welshCompetencyLabels.vehicleChecks}`);

      expect(result.dangerousFaults.length).toBe(3);
      expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.uncoupleRecouple}`);

      expect(result.date).toBe('31 Gorffennaf 2019');
    });
  });
});
