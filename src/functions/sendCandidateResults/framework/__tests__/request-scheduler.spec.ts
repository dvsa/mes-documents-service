import { RequestScheduler } from '../request-scheduler';
import { IConfigAdapter } from '../adapter/config/config-adapter.interface';
import { ConfigAdapterMock } from '../adapter/config/__mocks__/config-adapter.mock';
import { INotifyClient } from '../../domain/notify-client.interface';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';
import { ITemplateIdProvider, TemplateIdProvider } from '../../application/service/template-id-provider';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { IStatusUpdater } from '../status-updater';
import { NotifyClientStubFailure500 } from '../../application/stub/notify-client-stub-failure-500';
import { NextUploadBatchMock } from '../__mocks__/next-upload-batch.mock';
import { NotifyClientStubTimeout } from '../../application/stub/notify-client-stub-timeout';
import { IPersonalisationProvider, PersonalisationProvider } from '../../application/service/personalisation-provider';
import { IFaultProvider, FaultProvider } from '../../application/service/fault-provider';
import { StatusUpdaterMock } from '../__mocks__/status-updater.mock';
import { NOTIFY_INTERFACE } from '../../domain/interface.constants';
import { ProcessingStatus } from '../../domain/submission-outcome.model';
import { NotifyClientStubFailure400 } from '../../application/stub/notify-client-stub-failure-400';

describe('RequestScheduler', () => {

  let configAdapter: IConfigAdapter;
  let templateIdProvider: ITemplateIdProvider;
  let statusUpdater: IStatusUpdater;
  let faultProvider: IFaultProvider;
  let personalisationProvider: IPersonalisationProvider;

  const totalNumberOfTests: number = 1;

  let testResults: StandardCarTestCATBSchema[];

  beforeEach(async() => {
    configAdapter = new ConfigAdapterMock();
    templateIdProvider = new TemplateIdProvider(configAdapter);
    statusUpdater = new StatusUpdaterMock();
    faultProvider = new FaultProvider();
    personalisationProvider = new PersonalisationProvider(faultProvider);

    spyOn(statusUpdater, 'updateStatus');

    testResults = await new NextUploadBatchMock().get(totalNumberOfTests);
  });

  it('should call updateStatus when successfully notified candidate', async (done) => {
    const notifyClient: INotifyClient = new NotifyClientStubSuccess();

    const requestScheduler =
    new RequestScheduler(configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalledWith({
        applicationReference: 12345672011,
        outcomePayload: {
          interface: NOTIFY_INTERFACE,
          state: ProcessingStatus.ACCEPTED,
          staff_number: '123456',
          retry_count: 0,
          error_message: null,
        },
      });
      done();
    },         1000);
  });

  it('should call updateStatus in a failed state when requests return a 400 error', async (done) => {
    const notifyClient: INotifyClient = new NotifyClientStubFailure400();

    const requestScheduler =
    new RequestScheduler(configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalledWith({
        applicationReference: 12345672011,
        outcomePayload: {
          interface: NOTIFY_INTERFACE,
          state: ProcessingStatus.FAILED,
          staff_number: '123456',
          retry_count: 0,
          error_message: `Can't send to this recipient using a team-only API key`,
        },
      });
      done();
    },         1000);
  });

  it('should call updateStatus in a failed state when requests return a 500 error', async (done) => {
    const notifyClient: INotifyClient = new NotifyClientStubFailure500();

    const requestScheduler =
    new RequestScheduler(configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalledWith({
        applicationReference: 12345672011,
        outcomePayload: {
          interface: NOTIFY_INTERFACE,
          state: ProcessingStatus.FAILED,
          staff_number: '123456',
          retry_count: 3,
          error_message: 'Internal server error',
        },
      });
      done();
    },         1000);
  });

  it('should call updateStatus in a failed state when requests time out', async (done) => {
    const notifyClient: INotifyClient = new NotifyClientStubTimeout(configAdapter);

    const requestScheduler = new RequestScheduler(
      configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalledWith({
        applicationReference: 12345672011,
        outcomePayload: {
          interface: NOTIFY_INTERFACE,
          state: ProcessingStatus.FAILED,
          staff_number: '123456',
          retry_count: 3,
          error_message: 'timed out',
        },
      });
      done();
    },         4500);
  });

});
