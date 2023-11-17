// import { sendEmail } from '../send-email';
// import { mockEmail1 } from '../../../framework/__mocks__/test-data.mock';
// import { EmailPersonalisation, BooleanText } from '../../../domain/personalisation.model';
// import { INotifyClient } from '../../../domain/notify-client.interface';
// import { NotifyClientStubSuccess } from '../../stub/notify-client-stub-success';
// import { NotifyClientStubFailure400 } from '../../stub/notify-client-stub-failure-400';
// import { NotifyClientStubFailure500 } from '../../stub/notify-client-stub-failure-500';
// import { DocumentsServiceError } from '../../../domain/errors/documents-service-error';
//
// const personlisation: EmailPersonalisation = {
//   candidateName: 'some name',
//   applicationReference: 12345678,
//   category: 'B',
//   date: '01/01/1990',
//   drivingFaults: [],
//   seriousFaults: [],
//   dangerousFaults: [],
//   location: 'Test Centre',
//   showDangerousFaults: BooleanText.YES,
//   showDrivingFaults: BooleanText.YES,
//   showEcoText: BooleanText.YES,
//   showSeriousFaults: BooleanText.YES,
//   showEtaText: BooleanText.YES,
//   showEtaPhysical: BooleanText.YES,
//   showEtaVerbal: BooleanText.NO,
//   showProvLicenceRetainedByDvsa: BooleanText.YES,
//   showProvLicenceRetainedByDriver: BooleanText.NO,
// };
//
// describe('sendEmail', () => {
//
//   it('should successfully send an email', (async () => {
//     const notifyClient: INotifyClient = new NotifyClientStubSuccess();
//
//     const result =
//       await sendEmail(mockEmail1, 'temp-id', personlisation, '12345678', 'reply-id', notifyClient);
//
//     expect(result).toBe(undefined);
//   }));
//
//   it('should return a error with a negative retry flag for a 400 error', (async () => {
//     const notifyClient: INotifyClient = new NotifyClientStubFailure400();
//
//     try {
//       await sendEmail(mockEmail1, 'temp-id', personlisation, '123456', 'reply-id', notifyClient);
//     } catch (err) {
//
//       const documentsServiceError: DocumentsServiceError = err as DocumentsServiceError;
//       expect(documentsServiceError.statusCode).toBe(400);
//       expect(documentsServiceError.message).toBe('Can\'t send to this recipient using a team-only API key');
//       expect(documentsServiceError.shouldRetry).toBe(false);
//     }
//   }));
//
//   it('should return a error with a positive retry flag for a 500 error', (async () => {
//     const notifyClient: INotifyClient = new NotifyClientStubFailure500();
//
//     try {
//       await sendEmail(mockEmail1, 'temp-id', personlisation, '12345678', 'reply-id', notifyClient);
//     } catch (err) {
//
//       const documentsServiceError: DocumentsServiceError = err as DocumentsServiceError;
//       expect(documentsServiceError.statusCode).toBe(500);
//       expect(documentsServiceError.message).toBe('Internal server error');
//       expect(documentsServiceError.shouldRetry).toBe(true);
//     }
//   }));
// });
