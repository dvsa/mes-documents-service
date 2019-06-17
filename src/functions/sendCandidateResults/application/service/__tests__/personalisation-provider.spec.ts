import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
import { IFaultProvider, FaultProvider } from '../fault-provider';
import { completedCatBTest } from '../../../framework/__mocks__/test-data.mock';

describe('personalisation-provider', () => {

  let faultProvider: IFaultProvider;

  beforeEach(() => {
    faultProvider = new FaultProvider();
  });

  describe('getEmailPersonalisation', () => {
    it('should return the correct data', () => {
      const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

      const result = personalisationProvider.getEmailPersonalisation(completedCatBTest);

      expect(result.applicationReference).toBe('12345');
      expect(result.category).toBe('B');
      expect(result.date).toBe('09:00');
      expect(result.firstName).toBe('Joe');
      expect(result.lastName).toBe('Bloggs');
      // tslint:disable-next-line:max-line-length
      expect(result.drivingFaults).toBe('ancillaryControls - 1, awarenessPlanning - 1, controlsSteering - 1, signalsCorrectly - 1, controlledStop - 1, reverseParkCarparkControlFault - 1, reverseParkCarparkObservationFault - 1, ');
      // tslint:disable-next-line:max-line-length
      expect(result.seriousFaults).toBe('ancillaryControls - 1, awarenessPlanning - 1, reverseParkRoadControlFault - 1, reverseParkRoadObservationFault - 1, ');
      // tslint:disable-next-line:max-line-length
      expect(result.dangerousFaults).toBe('controlsSteering - 1, signalsCorrectly - 1, vehicleChecks - 1, ');
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

      expect(result.applicationReference).toBe('12345');
      expect(result.category).toBe('B');
      expect(result.date).toBe('09:00');
      expect(result.firstName).toBe('Joe');
      expect(result.lastName).toBe('Bloggs');
      // tslint:disable-next-line:max-line-length
      expect(result.drivingFaults).toBe('ancillaryControls - 1, awarenessPlanning - 1, controlsSteering - 1, signalsCorrectly - 1, controlledStop - 1, reverseParkCarparkControlFault - 1, reverseParkCarparkObservationFault - 1, ');
      // tslint:disable-next-line:max-line-length
      expect(result.seriousFaults).toBe('ancillaryControls - 1, awarenessPlanning - 1, reverseParkRoadControlFault - 1, reverseParkRoadObservationFault - 1, ');
      // tslint:disable-next-line:max-line-length
      expect(result.dangerousFaults).toBe('controlsSteering - 1, signalsCorrectly - 1, vehicleChecks - 1, ');
    });
  });
});
