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
  // Letter Template Id's A Mod1
  englishLetterPassTemplateIdAMod1: string;
  englishLetterFailTemplateIdAMod1: string;
  welshLetterPassTemplateIdAMod1: string;
  welshLetterFailTemplateIdAMod1: string;
  // Email Template Id's A Mod2
  englishEmailPassTemplateIdAMod2: string;
  englishEmailFailTemplateIdAMod2: string;
  welshEmailPassTemplateIdAMod2: string;
  welshEmailFailTemplateIdAMod2: string;
  // Letter Template Id's A Mod2
  englishLetterPassTemplateIdAMod2: string;
  englishLetterFailTemplateIdAMod2: string;
  welshLetterPassTemplateIdAMod2: string;
  welshLetterFailTemplateIdAMod2: string;

  getApiKey(): Promise<string>;
}
