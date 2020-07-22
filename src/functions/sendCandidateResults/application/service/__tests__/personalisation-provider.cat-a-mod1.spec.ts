import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { ICustomPropertyProvider, CustomPropertyProvider } from '../custom-property-provider';
import { completedCatAMod1Test } from '../../../framework/__mocks__/test-data.cat-a-mod1.mock';
import { BooleanText, CatAMod1Personalisation } from '../../../domain/personalisation.model';
import { modifiedEnglishCompetencyLabels } from '../../../domain/competencies';

describe('personalisation-provider-cat-a-mod1', () => {

  let faultProvider: IFaultProvider;
  let customPropertyProvider: ICustomPropertyProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();
    customPropertyProvider = new CustomPropertyProvider();

    if (completedCatAMod1Test.communicationPreferences) {
      completedCatAMod1Test.communicationPreferences.conductedLanguage = 'English';
    }
  });

  describe('getEmailPersonalisation', () => {
    it('should return the correct custom data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
        faultProvider,
        customPropertyProvider,
      );

      const result = personalisationProvider.getEmailPersonalisation(completedCatAMod1Test) as CatAMod1Personalisation;

      expect(result.drivingFaults).toContain(`${modifiedEnglishCompetencyLabels.moveOffSafety}, 3`);
      expect(result.drivingFaults).toContain(`${modifiedEnglishCompetencyLabels.moveOffControl}, 1`);
      expect(result.dangerousFaults).toContain(`${modifiedEnglishCompetencyLabels.moveOffSafety}`);
      expect(result.dangerousFaults).toContain(`${modifiedEnglishCompetencyLabels.moveOffControl}`);
      expect(result.seriousFaults).toContain(`${modifiedEnglishCompetencyLabels.moveOffControl}`);
      expect(result.seriousFaults).toContain(`${modifiedEnglishCompetencyLabels.moveOffControl}`);

      expect(result.showEmergencyStop).toEqual(BooleanText.YES);
      expect(result.showEmergencyFirstAttempt).toEqual(BooleanText.YES);
      expect(result.emergencyFirstAttempt).toEqual('44 km/h');
      expect(result.showEmergencySecondAttempt).toBe(BooleanText.YES);
      expect(result.emergencySecondAttempt).toEqual('47 km/h');
      expect(result.showAvoidanceExercise).toEqual(BooleanText.YES);
      expect(result.showAvoidanceFirstAttempt).toEqual(BooleanText.YES);
      expect(result.avoidanceFirstAttempt).toEqual('30 km/h');
      expect(result.showAvoidanceSecondAttempt).toEqual(BooleanText.YES);
      expect(result.avoidanceSecondAttempt).toEqual('38 km/h');
    });
  });
});
