export interface IConfigAdapter {
  isLocal: boolean;
  useNotify: boolean;
  retryLimit: number;
  resultsBaseApiUrl: string;
  notifyBatchSize: number;
  notifyRequestsPerBatch: number;
  notifyTimeout: number;
  EmailTemplateId: string;
  LetterTemplateId: string;


  getApiKey(): Promise<string>;
}
