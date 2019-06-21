import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';

import { INotifyClient } from '../../domain/notify-client.interface';
import { GovNotifyClient } from '../../application/gov-notify-client';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';
import { LogNotifyClient } from '../../application/log-notify-client';
import { ConfigAdapter } from '../adapter/config/config-adapter';
import { IConfigAdapter } from '../adapter/config/config-adapter.interface';
import { IRequestScheduler, RequestScheduler } from '../request-scheduler';
import { ITemplateIdProvider, TemplateIdProvider } from '../../application/service/template-id-provider';
import { IFaultProvider, FaultProvider } from '../../application/service/fault-provider';
import { INextUploadBatch } from '../../domain/next-upload-batch.interface';
import { NextUploadBatchMock } from '../__mocks__/next-upload-batch.mock';
import { NextUploadBatch } from '../next-upload-batch';
import { IPersonalisationProvider, PersonalisationProvider } from '../../application/service/personalisation-provider';
import { IStatusUpdater, StatusUpdater } from '../status-updater';
import { StatusUpdaterMock } from '../__mocks__/status-updater.mock';

const container = new Container();

container.bind<IConfigAdapter>(TYPES.IConfigAdapter).to(ConfigAdapter);

const configAdapter: IConfigAdapter = container.get<IConfigAdapter>(TYPES.IConfigAdapter);

configAdapter.getApiKey()
  .then(apiKey => container.bind<string>(TYPES.apiKey).toConstantValue(apiKey))
  .catch(err => container.bind<string>(TYPES.apiKey).toConstantValue(''));

if (configAdapter.isLocal) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(NotifyClientStubSuccess);
  container.bind<INextUploadBatch>(TYPES.INextUploadBatch).to(NextUploadBatchMock);
  container.bind<IStatusUpdater>(TYPES.IStatusUpdater).to(StatusUpdaterMock);
} else if (configAdapter.useNotify) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(GovNotifyClient);
  container.bind<INextUploadBatch>(TYPES.INextUploadBatch).to(NextUploadBatch);
  container.bind<IStatusUpdater>(TYPES.IStatusUpdater).to(StatusUpdater);

} else {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(LogNotifyClient);
  container.bind<INextUploadBatch>(TYPES.INextUploadBatch).to(NextUploadBatch);
  container.bind<IStatusUpdater>(TYPES.IStatusUpdater).to(StatusUpdater);
}

container.bind<IRequestScheduler>(TYPES.IRequestScheduler).to(RequestScheduler);
container.bind<ITemplateIdProvider>(TYPES.ITemplateIdProvider).to(TemplateIdProvider);
container.bind<IFaultProvider>(TYPES.IFaultProvider).to(FaultProvider);
container.bind<IPersonalisationProvider>(TYPES.IPersonalisationProvider).to(PersonalisationProvider);

export { container };
