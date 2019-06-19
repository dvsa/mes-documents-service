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

describe('RequestScheduler', () => {

  const totalNumberOfTests: number = 50;

  it('should call updateToAcceptedStatus when successfully notified candidate', async (done) => {
    const configAdapter: IConfigAdapter = new ConfigAdapterMock();
    const notifyClient: INotifyClient = new NotifyClientStubSuccess();
    const templateIdProvider: ITemplateIdProvider = new TemplateIdProvider(configAdapter);
    const statusUpdater: IStatusUpdater = new StatusUpdaterMock();
    const faultProvider: IFaultProvider = new FaultProvider();
    const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

    spyOn(statusUpdater, 'updateStatus');

    const requestScheduler =
    new RequestScheduler(configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    const testResults: StandardCarTestCATBSchema[] = await new NextUploadBatchMock().get(totalNumberOfTests);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalledWith({
        applicationReference: '1234567890',
        outcomePayload: {
          interface: NOTIFY_INTERFACE,
          state: ProcessingStatus.ACCEPTED,
          staff_number: '123456',
          retry_count: 0, // TODO - Need to set retry count somehow
          error_message: null,
        },
      });
      done();
    },         1000);
  });

  it('should call updateToAcceptedStatus when successfully notified candidate', async (done) => {
    const configAdapter: IConfigAdapter = new ConfigAdapterMock();
    const notifyClient: INotifyClient = new NotifyClientStubFailure500();
    const templateIdProvider: ITemplateIdProvider = new TemplateIdProvider(configAdapter);
    const statusUpdater: IStatusUpdater = new StatusUpdaterMock();
    const faultProvider: IFaultProvider = new FaultProvider();
    const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

    spyOn(statusUpdater, 'updateStatus');

    const requestScheduler =
    new RequestScheduler(configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    const testResults: StandardCarTestCATBSchema[] = await new NextUploadBatchMock().get(totalNumberOfTests);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalled();
      done();
    },         1000);
  });

  it('should call updateToAcceptedStatus when successfully notified candidate', async (done) => {
    const configAdapter: IConfigAdapter = new ConfigAdapterMock();
    const notifyClient: INotifyClient = new NotifyClientStubTimeout(configAdapter);
    const templateIdProvider: ITemplateIdProvider = new TemplateIdProvider(configAdapter);
    const statusUpdater: IStatusUpdater = new StatusUpdaterMock();
    const faultProvider: IFaultProvider = new FaultProvider();
    const personalisationProvider: IPersonalisationProvider = new PersonalisationProvider(faultProvider);

    spyOn(statusUpdater, 'updateStatus');

    const requestScheduler = new RequestScheduler(
      configAdapter, notifyClient, templateIdProvider, personalisationProvider, statusUpdater);

    const testResults: StandardCarTestCATBSchema[] = await new NextUploadBatchMock().get(1);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateStatus).toHaveBeenCalledWith({
        applicationReference: '1234567890',
        outcomePayload: {
          interface: NOTIFY_INTERFACE,
          state: ProcessingStatus.FAILED,
          staff_number: '123456',
          retry_count: 0,
          error_message: 'timed out',
        },
      });
      done();
    },         4500);
  });

});
