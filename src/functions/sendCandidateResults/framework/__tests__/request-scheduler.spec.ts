
const moment = require('moment');
import { RequestScheduler } from '../request-scheduler';
import { IConfigAdapter } from '../adapter/config/config-adapter.interface';
import { ConfigAdapterMock } from '../adapter/config/__mocks__/config-adapter.mock';
import { INotifyClient } from '../../domain/notify-client.interface';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';
import { ITemplateIdProvider, TemplateIdProvider } from '../../application/service/template-id-provider';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { getUploadBatch } from '../__mocks__/get-upload-batch.mock';
import { IStatusUpdater, StatusUpdater } from '../status-updater';
import { NotifyClientStubFailure500 } from '../../application/stub/notify-client-stub-failure-500';

describe('RequestScheduler', () => {

  const totalNumberOfTests = 50;

  it('should call updateToAcceptedStatus when successfully notified candidate', (done) => {
    const configAdapter: IConfigAdapter = new ConfigAdapterMock();
    const notifyClient: INotifyClient = new NotifyClientStubSuccess();
    const templateIdProvider: ITemplateIdProvider = new TemplateIdProvider(configAdapter);
    const statusUpdater: IStatusUpdater = new StatusUpdater();

    spyOn(statusUpdater, 'updateToAcceptedStatus');
    spyOn(statusUpdater, 'updateToFailedStatus');

    const requestScheduler = new RequestScheduler(configAdapter, notifyClient, templateIdProvider, statusUpdater);

    const testResults: StandardCarTestCATBSchema[] = getUploadBatch(totalNumberOfTests);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateToAcceptedStatus).toHaveBeenCalled();
      expect(statusUpdater.updateToFailedStatus).not.toHaveBeenCalled();
      done();
    },         1000);
  });

  it('should call updateToAcceptedStatus when successfully notified candidate', (done) => {
    const configAdapter: IConfigAdapter = new ConfigAdapterMock();
    const notifyClient: INotifyClient = new NotifyClientStubFailure500();
    const templateIdProvider: ITemplateIdProvider = new TemplateIdProvider(configAdapter);
    const statusUpdater: IStatusUpdater = new StatusUpdater();

    spyOn(statusUpdater, 'updateToAcceptedStatus');
    spyOn(statusUpdater, 'updateToFailedStatus');

    const requestScheduler = new RequestScheduler(configAdapter, notifyClient, templateIdProvider, statusUpdater);

    const testResults: StandardCarTestCATBSchema[] = getUploadBatch(totalNumberOfTests);

    requestScheduler.scheduleRequests(testResults);

    setTimeout(() => {
      expect(statusUpdater.updateToAcceptedStatus).not.toHaveBeenCalled();
      expect(statusUpdater.updateToFailedStatus).toHaveBeenCalled();
      done();
    },         1000);
  });

});
