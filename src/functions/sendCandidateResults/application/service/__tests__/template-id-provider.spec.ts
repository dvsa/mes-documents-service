// import {
//   TemplateIdProvider,
//   isPass,
//   isFail,
//   isVocationalCategory,
//   getTemplateString,
//   isHomeTestCategory,
//   isCPCCategory,
// } from '../template-id-provider';
// import { ConfigAdapterMock } from '../../../framework/adapter/config/__mocks__/config-adapter.mock';
// import {
//   ActivityCode,
//   CommunicationMethod,
//   CommunicationPreferences,
//   ConductedLanguage,
// } from '@dvsa/mes-test-schema/categories/common';
// import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
//
// const communicationPreferences: CommunicationPreferences = {
//   updatedEmail: 'email@somewhere.com',
//   communicationMethod: 'Not provided',
//   conductedLanguage: 'Not provided',
// };
//
// describe('get-template-id-provider', () => {
//   describe('TemplateIdProvider', () => {
//     let templateIdProvider: TemplateIdProvider;
//
//     beforeEach(() => {
//       templateIdProvider = new TemplateIdProvider(new ConfigAdapterMock);
//     });
//
//     describe('getTemplateId', () => {
//       describe('English templates', () => {
//         beforeAll(() => {
//           communicationPreferences.conductedLanguage = 'English';
//         });
//         describe('Email', () => {
//           beforeAll(() => {
//             communicationPreferences.communicationMethod = 'Email';
//           });
//           it('should return the english email pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.B))
//               .toBe('email-english-pass-template-id');
//           });
//           it('should return the english email fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.BE))
//               .toBe('email-english-fail-template-id');
//           });
//           it('should return the english post pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.C))
//               .toBe('email-english-pass-template-id-vocational');
//           });
//           it('should return the english post fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.C1))
//               .toBe('email-english-fail-template-id-vocational');
//           });
//         });
//
//         describe('Post', () => {
//           beforeAll(() => {
//             communicationPreferences.communicationMethod = 'Post';
//           });
//           it('should return the english post pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.B))
//               .toBe('post-english-pass-template-id');
//           });
//           it('should return the english post fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.BE))
//               .toBe('post-english-fail-template-id');
//           });
//           it('should return the english post pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.C))
//               .toBe('post-english-pass-template-id-vocational');
//           });
//           it('should return the english post fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.C1))
//               .toBe('post-english-fail-template-id-vocational');
//           });
//         });
//       });
//
//       describe('Welsh templates', () => {
//         beforeAll(() => {
//           communicationPreferences.conductedLanguage = 'Cymraeg';
//         });
//
//         describe('Email', () => {
//           beforeAll(() => {
//             communicationPreferences.communicationMethod = 'Email';
//           });
//           it('should return the welsh email pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.BE))
//               .toBe('email-welsh-pass-template-id');
//           });
//           it('should return the welsh email fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.B))
//               .toBe('email-welsh-fail-template-id');
//           });
//           it('should return the welsh post pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.CE))
//               .toBe('email-welsh-pass-template-id-vocational');
//           });
//           it('should return the welsh post fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.C1E))
//               .toBe('email-welsh-fail-template-id-vocational');
//           });
//         });
//
//         describe('Post', () => {
//           beforeAll(() => {
//             communicationPreferences.communicationMethod = 'Post';
//           });
//           it('should return the welsh post pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.BE))
//               .toBe('post-welsh-pass-template-id');
//           });
//           it('should return the welsh post fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.B))
//               .toBe('post-welsh-fail-template-id');
//           });
//           it('should return the welsh post pass template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '1', TestCategory.CE))
//               .toBe('post-welsh-pass-template-id-vocational');
//           });
//           it('should return the welsh post fail template', () => {
//             expect(templateIdProvider.getTemplateId(communicationPreferences, '2', TestCategory.C1E))
//               .toBe('post-welsh-fail-template-id-vocational');
//           });
//         });
//       });
//
//       it('should return ID not set string for terminated tests', () => {
//         expect(templateIdProvider.getTemplateId(communicationPreferences, '51', TestCategory.B))
//           .toBe(TemplateIdProvider.TEMPLATE_ID_NOT_SET);
//       });
//     });
//   });
//
//   describe('isPass', () => {
//     it('should return true if activty code is 1', () => {
//       expect(isPass('1')).toBeTruthy();
//     });
//     it('should return false if activity code is not 1', () => {
//       expect(isPass('2')).toBeFalsy();
//     });
//   });
//
//   describe('isFail', () => {
//     it('should return true if activty code is 2 ,3 ,4 or 5 ', () => {
//       expect(isFail('2')).toBeTruthy();
//       expect(isFail('3')).toBeTruthy();
//       expect(isFail('4')).toBeTruthy();
//       expect(isFail('5')).toBeTruthy();
//     });
//     it('should return false if activity code is 1', () => {
//       expect(isFail('1')).toBeFalsy();
//     });
//   });
//
//   describe('isVocationalCategory', () => {
//     it('should return true if category is in vocational category array', () => {
//       expect(isVocationalCategory(TestCategory.C)).toBe(true);
//       expect(isVocationalCategory(TestCategory.C1)).toBe(true);
//       expect(isVocationalCategory(TestCategory.CE)).toBe(true);
//       expect(isVocationalCategory(TestCategory.C1E)).toBe(true);
//       expect(isVocationalCategory(TestCategory.D)).toBe(true);
//       expect(isVocationalCategory(TestCategory.D1)).toBe(true);
//       expect(isVocationalCategory(TestCategory.DE)).toBe(true);
//       expect(isVocationalCategory(TestCategory.D1E)).toBe(true);
//     });
//
//     it('should return false when category is not in the vocational category array', () => {
//       expect(isVocationalCategory(TestCategory.B)).toBe(false);
//       expect(isVocationalCategory(TestCategory.BE)).toBe(false);
//     });
//   });
//
//   describe('isHomeTestCategory', () => {
//     it('should return true if category is in home test category array', () => {
//       expect(isHomeTestCategory(TestCategory.F)).toBe(true);
//       expect(isHomeTestCategory(TestCategory.G)).toBe(true);
//       expect(isHomeTestCategory(TestCategory.H)).toBe(true);
//       expect(isHomeTestCategory(TestCategory.K)).toBe(true);
//     });
//
//     it('should return false when category is not in the home test category array', () => {
//       expect(isHomeTestCategory(TestCategory.B)).toBe(false);
//       expect(isHomeTestCategory(TestCategory.BE)).toBe(false);
//       expect(isHomeTestCategory(TestCategory.C)).toBe(false);
//       expect(isHomeTestCategory(TestCategory.D)).toBe(false);
//     });
//   });
//
//   describe('isCPCCategory', () => {
//     it('should return true if category is in cpc test category array', () => {
//       expect(isCPCCategory(TestCategory.CCPC)).toBe(true);
//       expect(isCPCCategory(TestCategory.DCPC)).toBe(true);
//     });
//
//     it('should return false when category is not in the cpc test category array', () => {
//       expect(isCPCCategory(TestCategory.B)).toBe(false);
//       expect(isCPCCategory(TestCategory.BE)).toBe(false);
//     });
//   });
//
//   describe('getTemplateString', () => {
//     it('should return an english email pass template string', () => {
//       const conductedLanguage: ConductedLanguage = 'English';
//       const communicationMethod: CommunicationMethod = 'Email';
//       const activityCode: ActivityCode = '1';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('englishEmailPassTemplateId');
//     });
//     it('should return a welsh email pass template string', () => {
//       const conductedLanguage: ConductedLanguage = 'Cymraeg';
//       const communicationMethod: CommunicationMethod = 'Email';
//       const activityCode: ActivityCode = '1';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('welshEmailPassTemplateId');
//     });
//     it('should return an english letter pass template string', () => {
//       const conductedLanguage: ConductedLanguage = 'English';
//       const communicationMethod: CommunicationMethod = 'Post';
//       const activityCode: ActivityCode = '1';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('englishLetterPassTemplateId');
//     });
//     it('should return a welsh letter pass template string', () => {
//       const conductedLanguage: ConductedLanguage = 'Cymraeg';
//       const communicationMethod: CommunicationMethod = 'Post';
//       const activityCode: ActivityCode = '1';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('welshLetterPassTemplateId');
//     });
//     it('should return an english email fail template string', () => {
//       const conductedLanguage: ConductedLanguage = 'English';
//       const communicationMethod: CommunicationMethod = 'Email';
//       const activityCode: ActivityCode = '2';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('englishEmailFailTemplateId');
//     });
//     it('should return a welsh email fail template string', () => {
//       const conductedLanguage: ConductedLanguage = 'Cymraeg';
//       const communicationMethod: CommunicationMethod = 'Email';
//       const activityCode: ActivityCode = '2';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('welshEmailFailTemplateId');
//     });
//     it('should return an english letter fail template string', () => {
//       const conductedLanguage: ConductedLanguage = 'English';
//       const communicationMethod: CommunicationMethod = 'Post';
//       const activityCode: ActivityCode = '2';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('englishLetterFailTemplateId');
//     });
//     it('should return a welsh letter fail template string', () => {
//       const conductedLanguage: ConductedLanguage = 'Cymraeg';
//       const communicationMethod: CommunicationMethod = 'Post';
//       const activityCode: ActivityCode = '2';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('welshLetterFailTemplateId');
//     });
//     it('should return a template id not message set when activity code is 51', () => {
//       const conductedLanguage: ConductedLanguage = 'English';
//       const communicationMethod: CommunicationMethod = 'Post';
//       const activityCode: ActivityCode = '51';
//       expect(getTemplateString(conductedLanguage, communicationMethod, activityCode, TestCategory.B))
//         .toBe('Template Id not set');
//     });
//   });
// });
