import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from './di/types';
import { IConfigAdapter } from './adapter/config/config-adapter.interface';
import { SubmissionOutcome } from '../domain/submission-outcome.model';

export interface IStatusUpdater {
  updateStatus(submissionOutcome: SubmissionOutcome): void;
}

@injectable()
export class StatusUpdater implements IStatusUpdater {

  private resultsBaseApiUrl: string ;

  constructor(
    @inject(TYPES.IConfigAdapter) private configAdapter: IConfigAdapter,
  ) {
    this.resultsBaseApiUrl = this.configAdapter.resultsBaseApiUrl;
  }

  updateStatus(submissionOutcome: SubmissionOutcome): void {
    axios.put(
      `${this.resultsBaseApiUrl}/test-results/${submissionOutcome.applicationReference}/upload`,
      submissionOutcome.outcomePayload,
    );
  }
}
