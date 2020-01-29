export interface IConfigAdapter {
  isLocal: boolean;
  useNotify: boolean;
  retryLimit: number;
  resultsBaseApiUrl: string;
  notifyBatchSize: number;
  notifyRequestsPerBatch: number;
  notifyTimeout: number;
  // Email Template Id's
  englishEmailPassTemplateId: string;
  englishEmailFailTemplateId: string;
  welshEmailPassTemplateId: string;
  welshEmailFailTemplateId: string;
  // Letter Template Id's
  englishLetterPassTemplateId: string;
  englishLetterFailTemplateId: string;
  welshLetterPassTemplateId: string;
  welshLetterFailTemplateId: string;
  // Email Template Id's Vocational
  englishEmailPassTemplateIdVocational: string;
  englishEmailFailTemplateIdVocational: string;
  welshEmailPassTemplateIdVocational: string;
  welshEmailFailTemplateIdVocational: string;
  // Letter Template Id's Vocational
  englishLetterPassTemplateIdVocational: string;
  englishLetterFailTemplateIdVocational: string;
  welshLetterPassTemplateIdVocational: string;
  welshLetterFailTemplateIdVocational: string;

  getApiKey(): Promise<string>;
}
