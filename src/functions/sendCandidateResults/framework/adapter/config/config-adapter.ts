import { IConfigAdapter } from './config-adapter.interface';
import { injectable } from 'inversify';
import * as awsSdk from 'aws-sdk';
import { isEmpty } from 'lodash';

@injectable()
export class ConfigAdapter implements IConfigAdapter {

  private apiKey: string;

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
  // Email Template Id's Manoeuvre
  englishEmailPassTemplateIdMan: string;
  englishEmailFailTemplateIdMan: string;
  welshEmailPassTemplateIdMan: string;
  welshEmailFailTemplateIdMan: string;
  // Letter Template Id's Manoeuvre
  englishLetterPassTemplateIdMan: string;
  englishLetterFailTemplateIdMan: string;
  welshLetterPassTemplateIdMan: string;
  welshLetterFailTemplateIdMan: string;

  constructor() {
    this.apiKey = '';
    this.isLocal = this.getBooleanFromEnv('IS_LOCAL');
    this.useNotify = this.getBooleanFromEnv('USE_NOTIFY');
    this.retryLimit = this.getNumberFromEnv('NOTIFY_RETRY_LIMIT') || 0;
    this.notifyBatchSize = this.getNumberFromEnv('NOTIFY_BATCH_SIZE') || 250;
    this.notifyRequestsPerBatch = this.getNumberFromEnv('NOTIFY_REQUESTS_PER_BATCH') || 25;
    this.notifyTimeout = this.getNumberFromEnv('NOTIFY_TIMEOUT') || 10000;
    this.resultsBaseApiUrl = this.getFromEnvThrowIfNotPresent('RESULTS_API_BASE_URL');

    // Car Email
    this.englishEmailPassTemplateId = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_CAR');
    this.englishEmailFailTemplateId = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_CAR');
    this.welshEmailPassTemplateId = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_CAR');
    this.welshEmailFailTemplateId = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_CAR');
    // Car Letter
    this.englishLetterPassTemplateId = this.getFromEnvThrowIfNotPresent('POST_PASS_CAR');
    this.englishLetterFailTemplateId = this.getFromEnvThrowIfNotPresent('POST_FAIL_CAR');
    this.welshLetterPassTemplateId = this.getFromEnvThrowIfNotPresent('POST_W_PASS_CAR');
    this.welshLetterFailTemplateId = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_CAR');
    // VOCATIONAL Email
    this.englishEmailPassTemplateIdVocational = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_VOC');
    this.englishEmailFailTemplateIdVocational = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_VOC');
    this.welshEmailPassTemplateIdVocational = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_VOC');
    this.welshEmailFailTemplateIdVocational = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_VOC');
    // VOCATIONAL Letter
    this.englishLetterPassTemplateIdVocational = this.getFromEnvThrowIfNotPresent('POST_PASS_VOC');
    this.englishLetterFailTemplateIdVocational = this.getFromEnvThrowIfNotPresent('POST_FAIL_VOC');
    this.welshLetterPassTemplateIdVocational = this.getFromEnvThrowIfNotPresent('POST_W_PASS_VOC');
    this.welshLetterFailTemplateIdVocational = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_VOC');
    // AMOD1 Email
    this.englishEmailPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_AMOD1');
    this.englishEmailFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_AMOD1');
    this.welshEmailPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_AMOD1');
    this.welshEmailFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_AMOD1');
    // AMOD1 Letter
    this.englishLetterPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('POST_PASS_AMOD1');
    this.englishLetterFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('POST_FAIL_AMOD1');
    this.welshLetterPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('POST_W_PASS_AMOD1');
    this.welshLetterFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_AMOD1');
    // AMOD2 Email
    this.englishEmailPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_AMOD2');
    this.englishEmailFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_AMOD2');
    this.welshEmailPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_AMOD2');
    this.welshEmailFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_AMOD2');
    // AMOD2 Letter
    this.englishLetterPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('POST_PASS_AMOD2');
    this.englishLetterFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('POST_FAIL_AMOD2');
    this.welshLetterPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('POST_W_PASS_AMOD2');
    this.welshLetterFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_AMOD2');
    // HOME Email
    this.englishEmailPassTemplateIdHome = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_HOME');
    this.englishEmailFailTemplateIdHome = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_HOME');
    this.welshEmailPassTemplateIdHome = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_HOME');
    this.welshEmailFailTemplateIdHome = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_HOME');
    // HOME Letter
    this.englishLetterPassTemplateIdHome = this.getFromEnvThrowIfNotPresent('POST_PASS_HOME');
    this.englishLetterFailTemplateIdHome = this.getFromEnvThrowIfNotPresent('POST_FAIL_HOME');
    this.welshLetterPassTemplateIdHome = this.getFromEnvThrowIfNotPresent('POST_W_PASS_HOME');
    this.welshLetterFailTemplateIdHome = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_HOME');
    // ADI Email
    this.englishEmailPassTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_ADI2');
    this.englishEmailFailTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_ADI2');
    this.welshEmailPassTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_ADI2');
    this.welshEmailFailTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_ADI2');
    // ADI Letter
    this.englishLetterPassTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('POST_PASS_ADI2');
    this.englishLetterFailTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('POST_FAIL_ADI2');
    this.welshLetterPassTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('POST_W_PASS_ADI2');
    this.welshLetterFailTemplateIdAdi2 = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_ADI2');
    // CPC Email
    this.englishEmailPassTemplateIdCpc = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_CPC4');
    this.englishEmailFailTemplateIdCpc = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_CPC4');
    this.welshEmailPassTemplateIdCpc = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_CPC4');
    this.welshEmailFailTemplateIdCpc = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_CPC4');
    // CPC Letter
    this.englishLetterPassTemplateIdCpc = this.getFromEnvThrowIfNotPresent('POST_PASS_CPC4');
    this.englishLetterFailTemplateIdCpc = this.getFromEnvThrowIfNotPresent('POST_FAIL_CPC4');
    this.welshLetterPassTemplateIdCpc = this.getFromEnvThrowIfNotPresent('POST_W_PASS_CPC4');
    this.welshLetterFailTemplateIdCpc = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_CPC4');
    // Manoeuvre Email
    this.englishEmailPassTemplateIdMan = this.getFromEnvThrowIfNotPresent('EMAIL_PASS_MAN');
    this.englishEmailFailTemplateIdMan = this.getFromEnvThrowIfNotPresent('EMAIL_FAIL_MAN');
    this.welshEmailPassTemplateIdMan = this.getFromEnvThrowIfNotPresent('EMAIL_W_PASS_MAN');
    this.welshEmailFailTemplateIdMan = this.getFromEnvThrowIfNotPresent('EMAIL_W_FAIL_MAN');
    // Manoeuvre Letter
    this.englishLetterPassTemplateIdMan = this.getFromEnvThrowIfNotPresent('POST_PASS_MAN');
    this.englishLetterFailTemplateIdMan = this.getFromEnvThrowIfNotPresent('POST_FAIL_MAN');
    this.welshLetterPassTemplateIdMan = this.getFromEnvThrowIfNotPresent('POST_W_PASS_MAN');
    this.welshLetterFailTemplateIdMan = this.getFromEnvThrowIfNotPresent('POST_W_FAIL_MAN');
  }

  public async getApiKey(): Promise<string> {
    if (!isEmpty(this.apiKey)) {
      return Promise.resolve(this.apiKey);
    }

    if (this.isLocal) {
      return Promise.resolve(this.getFromEnvThrowIfNotPresent('NOTIFY_API_KEY'));
    }

    const documentServiceSecretName = this.getFromEnvThrowIfNotPresent('DOCUMENTS_SERVICE_SECRET_NAME');

    const secretsmanager = new awsSdk.SecretsManager();
    const params: awsSdk.SecretsManager.GetSecretValueRequest = {
      SecretId: documentServiceSecretName,
    };

    try {
      const secretValue = await secretsmanager.getSecretValue(params).promise();
      const secrets = JSON.parse(secretValue.SecretString || '');
      if (isEmpty(secrets)) {
        throw new Error('secret string was empty');
      }
      return Promise.resolve(secrets['NOTIFY_API_KEY'] || '');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  protected getNumberFromEnv(envvarName: string): number | null {
    const asNumber = Number.parseInt(process.env[envvarName] || '', 10);
    return Number.isNaN(asNumber) ? null : asNumber;
  }

  protected getBooleanFromEnv(envvarName: string): boolean {
    const envvarVal = process.env[envvarName];

    return (
      envvarVal !== undefined &&
      envvarVal.trim().length > 0 &&
      envvarVal.toLowerCase() === 'true'
    );
  }

  protected getFromEnvThrowIfNotPresent(envvarName: string): string {
    const envvarVal = process.env[envvarName];
    if (envvarVal === undefined || envvarVal.trim().length === 0) {
      throw new Error(`Couldn't find envvar ${envvarName}`);
    }
    return envvarVal as string;
  }
}
