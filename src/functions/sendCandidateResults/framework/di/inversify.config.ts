import { Container } from 'inversify';
import { TYPES } from './types';

import { INotifyClient } from '../../domain/notify-client.interface';
import { GovNotifyClient } from '../../application/gov-notify-client';
import { NotifyClientStubSuccess } from '../../application/stub/notify-client-stub-success';

const container = new Container();

const isLocal = process.env.IS_LOCAL || false;

if (isLocal) {
  container.bind<INotifyClient>(TYPES.INotifyClient).to(NotifyClientStubSuccess);
}
container.bind<INotifyClient>(TYPES.INotifyClient).to(GovNotifyClient);
