// import { IPersonalisationProvider, PersonalisationProvider } from '../personalisation-provider';
// import { BooleanText, CatCPCPersonalisation } from '../../../domain/personalisation.model';
// import { completedCPCTest } from '../../../framework/__mocks__/test-data.cat-cpc.mock';
// import { FaultProvider, IFaultProvider } from '../fault-provider';
// import { CustomPropertyProvider, ICustomPropertyProvider } from '../custom-property-provider';
//
// describe('Personalisation-provider-cat-cpc', () => {
//   let faultProvider: IFaultProvider;
//   let customPropertyProvider: ICustomPropertyProvider;
//
//   beforeEach(() => {
//     faultProvider = new FaultProvider();
//     customPropertyProvider = new CustomPropertyProvider();
//   });
//
//   describe('getEmailPersonalisation', () => {
//     it('should return the correct data for CPC tests', () => {
//       const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(
//         faultProvider,
//         customPropertyProvider,
//       );
//       const result = personalisationProvider.getEmailPersonalisation(completedCPCTest) as CatCPCPersonalisation;
//
//       // Common
//       expect(result.applicationReference).toBe(11123466011);
//       expect(result.category).toBe('CCPC');
//       expect(result.date).toBe('6 July 2020');
//       expect(result.location).toBe('Example Test Centre');
//       expect(result.drivingFaults.length).toBe(0);
//       expect(result.seriousFaults.length).toBe(0);
//       expect(result.dangerousFaults.length).toBe(0);
//       expect(result.showDrivingFaults).toEqual(BooleanText.NO);
//       expect(result.showSeriousFaults).toEqual(BooleanText.NO);
//       expect(result.showDangerousFaults).toEqual(BooleanText.NO);
//       expect(result.showEcoText).toBe(BooleanText.NO);
//       expect(result.showEtaText).toEqual(BooleanText.NO);
//       expect(result.showEtaVerbal).toEqual(BooleanText.NO);
//       expect(result.showEtaPhysical).toEqual(BooleanText.NO);
//
//       // CPC Specific values
//       expect(result.q1Score).toBe('10');
//       expect(result.q2Score).toBe('0');
//       expect(result.q3Score).toBe('0');
//       expect(result.q4Score).toBe('0');
//       expect(result.q5Score).toBe('0');
//       expect(result.totalScore).toBe('10');
//       expect(result.showLGVText).toBe(BooleanText.YES);
//       expect(result.showPCVText).toBe(BooleanText.NO);
//     });
//   });
// });
