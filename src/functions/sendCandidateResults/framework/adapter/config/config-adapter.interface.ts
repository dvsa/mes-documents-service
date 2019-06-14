export interface IConfigAdapter {
  isLocal: boolean;
  useNotify: boolean;
  retryLimit: number;
  highwater: number;
  batchSize: number;
  requestTimeout: number;
  apiKey: string;
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
}
