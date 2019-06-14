
const moment = require('moment');
import { RequestScheduler } from '../request-scheduler';
import { IConfigAdapter } from '../adapter/config/config-adapter.interface';
import { ConfigAdapterMock } from '../adapter/config/__mocks__/config-adapter.mock';
import { INotifyClient } from '../../domain/notify-client.interface';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';
import { ITemplateIdProvider, TemplateIdProvider } from '../../application/service/template-id-provider';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { getUploadBatch } from '../__mocks__/get-upload-batch.mock';
import { IStatusUploader, StatusUploader } from '../status-uploader';

describe('RequestScheduler', () => {

  const totalNumberOfTests = 50;

  it('should run', async (done) => {
    const configAdapter: IConfigAdapter = new ConfigAdapterMock();
    const notifyClient: INotifyClient = new NotifyClientStubSuccess();
    const templateIdProvider: ITemplateIdProvider = new TemplateIdProvider(configAdapter);
    const statusUploader: IStatusUploader = new StatusUploader();

    spyOn(statusUploader, 'uploadAcceptedStatus');

    const requestScheduler = new RequestScheduler(configAdapter, notifyClient, templateIdProvider, statusUploader);

    const testResults: StandardCarTestCATBSchema[] = getUploadBatch(totalNumberOfTests);

    requestScheduler.scheduleRequests(testResults);

    let numberOfJobs = 0;

    requestScheduler.limiter.on('done', () => {
      numberOfJobs = numberOfJobs + 1;

      if (numberOfJobs > totalNumberOfTests) {
        console.log('numberOfJobs greater than 50', numberOfJobs);
        expect(statusUploader.uploadAcceptedStatus).toHaveBeenCalledTimes(totalNumberOfTests);
        done();
      }
    });
  });

});
