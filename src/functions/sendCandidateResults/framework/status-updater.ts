
export interface IStatusUpdater {
  uploadAcceptedStatus(applicationId: number): void;

  uploadFailedStatus(applicationId: number): void;
}

export class StatusUpdater implements IStatusUpdater {
  constructor() {

  }

  uploadAcceptedStatus(applicationId: number): void {
    console.log(`Upload test [${applicationId}] status to accepted`);
  }

  uploadFailedStatus(applicationId: number): void {
    console.log(`Upload test [${applicationId}] status to failed`);
  }

}
