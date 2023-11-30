import { mockEmail1 } from '../../../framework/__mocks__/test-data.mock';
import { PersonalisationDetails } from '../../../domain/personalisation.model';
import { INotifyClient } from '../../../domain/notify-client.interface';
import { NotifyClientStubSuccess } from '../../stub/notify-client-stub-success';
import { NotifyClientStubFailure400 } from '../../stub/notify-client-stub-failure-400';
import { NotifyClientStubFailure500 } from '../../stub/notify-client-stub-failure-500';
import { DocumentsServiceError } from '../../../domain/errors/documents-service-error';
import { sendNotification } from '../send-notification';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Correspondence } from '../../../domain/template-id.model';
import { Language } from '../../../domain/conducted-language';
import { TestOutcome } from '../../../domain/test-outcome';

const emailPersonlisationB: PersonalisationDetails = {
  candidateName: 'some name',
  address_line_1: 'add1',
  address_line_2: 'add2',
  postcode: 'sa1',
  applicationReference: 12345678,
  category: TestCategory.B,
  date: '01/01/1990',
  drivingFaults: [],
  seriousFaults: [],
  dangerousFaults: [],
  location: 'Test Centre',
  showDangerousFaults: true,
  showDrivingFaults: true,
  showEcoText: true,
  showSeriousFaults: true,
  showEtaText: true,
  showEtaPhysical: true,
  showEtaVerbal: false,
  showProvLicenceRetainedByDvsa: true,
  showProvLicenceRetainedByDriver: false,
};

describe('sendNotification', () => {

  it('should successfully send an email', (async () => {
    const notifyClient: INotifyClient = new NotifyClientStubSuccess();

    const result =
      await sendNotification(
        mockEmail1,
        Correspondence.EMAIL,
        'temp-id',
        emailPersonlisationB,
        '12345678',
        'reply-id',
        notifyClient,
        Language.ENGLISH,
        TestOutcome.PASS,
      );

    // console.log('result', result)
    expect(result).toBe(undefined);
  }));

  it('should return a error with a negative retry flag for a 400 error', (async () => {
    const notifyClient: INotifyClient = new NotifyClientStubFailure400();

    try {
      await sendNotification(
        mockEmail1,
        Correspondence.EMAIL,
        'temp-id',
        emailPersonlisationB,
        '123456',
        'reply-id',
        notifyClient,
        Language.ENGLISH,
        TestOutcome.PASS,
      );
    } catch (err) {

      const documentsServiceError: DocumentsServiceError = err as DocumentsServiceError;
      expect(documentsServiceError.statusCode).toBe(400);
      expect(documentsServiceError.message).toBe('Can\'t send to this recipient using a team-only API key');
      expect(documentsServiceError.shouldRetry).toBe(false);
    }
  }));

  it('should return a error with a positive retry flag for a 500 error', (async () => {
    const notifyClient: INotifyClient = new NotifyClientStubFailure500();

    try {
      await sendNotification(
        mockEmail1,
        Correspondence.EMAIL,
        'temp-id',
        emailPersonlisationB,
        '12345678',
        'reply-id',
        notifyClient,
        Language.ENGLISH,
        TestOutcome.PASS,
      );
    } catch (err) {

      const documentsServiceError: DocumentsServiceError = err as DocumentsServiceError;
      expect(documentsServiceError.statusCode).toBe(500);
      expect(documentsServiceError.message).toBe('Internal server error');
      expect(documentsServiceError.shouldRetry).toBe(true);
    }
  }));
});
