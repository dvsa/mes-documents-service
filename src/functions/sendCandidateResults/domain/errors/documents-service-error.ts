export class DocumentsServiceError extends Error {

  statusCode: number;
  shouldRetry: boolean;

  constructor(statusCode: number, message: string, shouldRetry: boolean) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.shouldRetry = shouldRetry;
  }
}
