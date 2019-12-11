import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { completedCatBETest } from '../../../framework/__mocks__/test-data.cat-be.mock';
import { englishCompetencyLabels, welshCompetencyLabels } from '../../../domain/competencies';
import { BooleanText } from '../../../domain/personalisation.model';

describe('personalisation-provider-cat-be', () => {

  let faultProvider: IFaultProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();

    if (completedCatBETest.communicationPreferences) {
      completedCatBETest.communicationPreferences.conductedLanguage = 'English';
    }
  });

  describe('getEmailPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      const result = personalisationProvider.getEmailPersonalisation(completedCatBETest);

      expect(result.applicationReference).toBe(12345671011);
      expect(result.category).toBe('B+E');
      expect(result.date).toBe('31 July 2019');
      expect(result.location).toBe('Test Centre 001');

      expect(result.drivingFaults.length).toBe(1);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.vehicleChecks}, 4`);

      // Extra Checks to make sure order is correct
      expect(result.drivingFaults[0]).toContain('4');

      expect(result.seriousFaults.length).toBe(2);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseLeftControl}`);

      expect(result.dangerousFaults.length).toBe(1);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.uncoupleRecouple}`);

      expect(result.showDrivingFaults).toEqual(BooleanText.YES);
      expect(result.showSeriousFaults).toEqual(BooleanText.YES);
      expect(result.showDangerousFaults).toEqual(BooleanText.YES);
      expect(result.showEcoText).toBe(BooleanText.NO);
    });
    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      if (completedCatBETest.communicationPreferences) {
        completedCatBETest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getEmailPersonalisation(completedCatBETest);

      expect(result.drivingFaults.length).toBe(1);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.vehicleChecks}, 4`);

      // expect(result.seriousFaults.length).toBe(2);
      // expect(result.seriousFaults).toContain(`${welshCompetencyLabels.reverseLeftControl}`);

      // expect(result.dangerousFaults.length).toBe(1);
      // expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.uncoupleRecouple}`);
    });
  });

  describe('getLetterPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

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

      expect(result.drivingFaults.length).toBe(1);
      expect(result.drivingFaults).toContain(`${englishCompetencyLabels.vehicleChecks}, 4`);

      // Extra Checks to make sure order is correct
      expect(result.drivingFaults[0]).toContain('4');

      expect(result.seriousFaults.length).toBe(2);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.vehicleChecks}`);
      expect(result.seriousFaults).toContain(`${englishCompetencyLabels.reverseLeftControl}`);

      expect(result.dangerousFaults.length).toBe(1);
      expect(result.dangerousFaults).toContain(`${englishCompetencyLabels.uncoupleRecouple}`);

      expect(result.showDrivingFaults).toEqual(BooleanText.YES);
      expect(result.showSeriousFaults).toEqual(BooleanText.YES);
      expect(result.showDangerousFaults).toEqual(BooleanText.YES);
      expect(result.showEcoText).toBe(BooleanText.NO);
    });

    it('should return welsh translations when required', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      if (completedCatBETest.communicationPreferences) {
        completedCatBETest.communicationPreferences.conductedLanguage = 'Cymraeg';
      }

      const result = personalisationProvider.getLetterPersonalisation(completedCatBETest);

      expect(result.drivingFaults.length).toBe(1);
      expect(result.drivingFaults).toContain(`${welshCompetencyLabels.vehicleChecks}, 4`);

      // expect(result.seriousFaults.length).toBe(2);
      // expect(result.seriousFaults).toContain(`${welshCompetencyLabels.reverseLeftControl}`);

      // expect(result.dangerousFaults.length).toBe(1);
      // expect(result.dangerousFaults).toContain(`${welshCompetencyLabels.uncoupleRecouple}`);

      expect(result.date).toBe('31 Gorffennaf 2019');
    });
  });
});
