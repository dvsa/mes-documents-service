import { injectable } from 'inversify';

export interface IStatusUpdater {
  updateToAcceptedStatus(applicationId: number): void;

  updateToFailedStatus(applicationId: number): void;
}
@injectable()
export class StatusUpdater implements IStatusUpdater {
  constructor() {

  }

  updateToAcceptedStatus(applicationId: number): void {
    console.log(`Update test [${applicationId}] status to accepted`);
  }

  updateToFailedStatus(applicationId: number): void {
    console.log(`Update test [${applicationId}] status to failed`);
  }

}
