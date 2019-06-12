import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';

import { INotifyClient } from '../../domain/notify-client.interface';
import { GovNotifyClient } from '../../application/gov-notify-client';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';
import { LogNotifyClient } from '../../application/log-notify-client';
import { ConfigAdapter } from '../adapter/config/config-adapter';
import { IConfigAdapter } from '../adapter/config/config-adapter.interface';

const container = new Container();

container.bind<IConfigAdapter>(TYPES.IConfigAdapter).to(ConfigAdapter);

const configAdapter: IConfigAdapter = container.get<IConfigAdapter>(TYPES.IConfigAdapter);

container.bind<string>(TYPES.apiKey).toConstantValue(configAdapter.apiKey);

if (configAdapter.isLocal) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(NotifyClientStubSuccess);
} else if (configAdapter.useNotify) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(GovNotifyClient);
} else {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(LogNotifyClient);
}

export { container };
