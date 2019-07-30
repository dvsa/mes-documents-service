import { sendLetter } from '../send-letter';
import { LetterPersonalisation } from '../../../domain/personalisation.model';
import { INotifyClient } from '../../../domain/notify-client.interface';
import { NotifyClientStubSuccess } from '../../stub/notify-client-stub-success';
import { NotifyClientStubFailure400 } from '../../stub/notify-client-stub-failure-400';
import { NotifyClientStubFailure500 } from '../../stub/notify-client-stub-failure-500';
import { DocumentsServiceError } from '../../../domain/errors/documents-service-error';

const personlisation : LetterPersonalisation = {
  address_line_1: 'address line 1',
  address_line_2: 'address line 2',
  postcode: 'postcode',
  applicationReference: 12345678,
  category: 'B',
  date: '01/01/1990',
  firstName: 'Fred',
  lastName: 'Elliot',
  drivingFaults: [],
  seriousFaults: [],
  dangerousFaults: [],
  driverNumber: 'ABCD',
  location: 'Test Centre',
};

describe('sendLetter' , () => {

  it('should successfully send a letter', (async() => {
    const notifyClient: INotifyClient = new NotifyClientStubSuccess();

    const result = await sendLetter('template-id', personlisation, 'ref', notifyClient);

    expect(result).toBe(undefined);

  }));

  it('should return a error with a negative retry flag for a 400 error', (async() => {
    const notifyClient: INotifyClient = new NotifyClientStubFailure400();

    try {
      await sendLetter('template-id', personlisation, 'ref', notifyClient);
    } catch (err) {

      const documentsServiceError: DocumentsServiceError = err as DocumentsServiceError;
      expect(documentsServiceError.statusCode).toBe(400);
      expect(documentsServiceError.message).toBe('Can\'t send to this recipient using a team-only API key');
      expect(documentsServiceError.shouldRetry).toBe(false);
    }
  }));

  it('should return a error with a positive retry flag for a 500 error', (async() => {
    const notifyClient: INotifyClient = new NotifyClientStubFailure500();

    try {
      await sendLetter('template-id', personlisation, 'ref', notifyClient);
    } catch (err) {

      const documentsServiceError: DocumentsServiceError = err as DocumentsServiceError;
      expect(documentsServiceError.statusCode).toBe(500);
      expect(documentsServiceError.message).toBe('Internal server error');
      expect(documentsServiceError.shouldRetry).toBe(true);
    }
  }));
});
