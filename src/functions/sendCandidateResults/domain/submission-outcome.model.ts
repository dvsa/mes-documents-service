export interface SubmissionOutcome {
  applicationReference: string;
  outcomePayload: {
    staff_number: string;
    interface: string;
    state: ProcessingStatus;
    retry_count: RetryCount;
    error_message: string | null;
  };
}

export enum ProcessingStatus {
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  FAILED = 'FAILED',
}

export type RetryCount = number;
