
export interface IStatusUploader {
  uploadAcceptedStatus(applicationId: number): void;

  uploadFailedStatus(applicationId: number): void;
}

export class StatusUploader implements IStatusUploader {
  constructor() {

  }

  uploadAcceptedStatus(applicationId: number): void {
    console.log(`Uplaod test [${applicationId}] status to accepted`);
  }

  uploadFailedStatus(applicationId: number): void {
    console.log(`Upload test [${applicationId}] status to failed`);
  }

}
