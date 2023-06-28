import { container } from './di/inversify.config';
import { TYPES } from './di/types';
import { IRequestScheduler } from './request-scheduler';
import { INextUploadBatch } from '../domain/next-upload-batch.interface';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { bootstrapLogging, error, info } from '@dvsa/mes-microservice-common/application/utils/logger';
import { ScheduledEvent } from 'aws-lambda';

export async function handler(event: ScheduledEvent) {
  try {
    bootstrapLogging('send-candidate-results', event);

    info('Getting nextUploadBatch');
    const nextUploadBatch = container.get<INextUploadBatch>(TYPES.INextUploadBatch);
    const testResults: TestResultSchemasUnion[] = await nextUploadBatch.get();

    info('Calling scheduleRequests');
    const requestScheduler: IRequestScheduler = container.get<IRequestScheduler>(TYPES.IRequestScheduler);
    await Promise.all(requestScheduler.scheduleRequests(testResults));

    info('Processed successfully');
  } catch (err) {
    error(`### err:  ${err}`);
    throw(err);
  }
}
