import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';

import { INotifyClient } from '../../domain/notify-client.interface';
import { GovNotifyClient } from '../../application/gov-notify-client';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';
import { LogNotifyClient } from '../../application/log-notify-client';

const container = new Container();

const isLocal: boolean = process.env.IS_LOCAL === 'true';
const useNotify: boolean = process.env.USE_NOTIFY === 'true';

const apiKey = process.env.NOTIFY_API_KEY || '';

container.bind<string>(TYPES.apiKey).toConstantValue(apiKey);

if (isLocal) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(NotifyClientStubSuccess);
} else if (useNotify) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(GovNotifyClient);
} else {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(LogNotifyClient);
}

export { container };
