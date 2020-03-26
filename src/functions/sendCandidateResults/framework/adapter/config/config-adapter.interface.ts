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
  // Email Template Id's A Mod1
  englishEmailPassTemplateIdAMod1: string;
  englishEmailFailTemplateIdAMod1: string;
  welshEmailPassTemplateIdAMod1: string;
  welshEmailFailTemplateIdAMod1: string;
  // Email Template Id's Home
  englishEmailPassTemplateIdHome: string;
  englishEmailFailTemplateIdHome: string;
  welshEmailPassTemplateIdHome: string;
  welshEmailFailTemplateIdHome: string;
  // Letter Template Id's Home
  englishLetterPassTemplateIdHome: string;
  englishLetterFailTemplateIdHome: string;
  welshLetterPassTemplateIdHome: string;
  welshLetterFailTemplateIdHome: string;

  getApiKey(): Promise<string>;
}
