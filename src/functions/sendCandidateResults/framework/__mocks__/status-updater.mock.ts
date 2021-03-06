import { injectable } from 'inversify';
import { IStatusUpdater } from '../status-updater';
import { SubmissionOutcome } from '../../domain/submission-outcome.model';

@injectable()
export class StatusUpdaterMock implements IStatusUpdater {

  updateStatus(submissionOutcome: SubmissionOutcome): Promise<any> {
    return Promise.resolve();
  }
}
