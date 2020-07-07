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
  // AMOD2 Email
  englishEmailPassTemplateIdAMod2: string;
  englishEmailFailTemplateIdAMod2: string;
  welshEmailPassTemplateIdAMod2: string;
  welshEmailFailTemplateIdAMod2: string;
  // AMOD2 Letter
  englishLetterPassTemplateIdAMod2: string;
  englishLetterFailTemplateIdAMod2: string;
  welshLetterPassTemplateIdAMod2: string;
  welshLetterFailTemplateIdAMod2: string;
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
  // Email Template Id's ADI
  englishEmailPassTemplateIdAdi2: string;
  englishEmailFailTemplateIdAdi2: string;
  welshEmailPassTemplateIdAdi2: string;
  welshEmailFailTemplateIdAdi2: string;
  // Letter Template Id's ADI
  englishLetterPassTemplateIdAdi2: string;
  englishLetterFailTemplateIdAdi2: string;
  welshLetterPassTemplateIdAdi2: string;
  welshLetterFailTemplateIdAdi2: string;
  // Email Template Id's CPC
  englishEmailPassTemplateIdCpc: string;
  englishEmailFailTemplateIdCpc: string;
  welshEmailPassTemplateIdCpc: string;
  welshEmailFailTemplateIdCpc: string;
  // Letter Template Id's CPC
  englishLetterPassTemplateIdCpc: string;
  englishLetterFailTemplateIdCpc: string;
  welshLetterPassTemplateIdCpc: string;
  welshLetterFailTemplateIdCpc: string;

  getApiKey(): Promise<string>;
}
