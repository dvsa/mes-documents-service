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

  constructor() {
    this.apiKey = '';
    this.isLocal = this.getBooleanFromEnv('IS_LOCAL');
    this.useNotify = this.getBooleanFromEnv('USE_NOTIFY');
    this.retryLimit = this.getNumberFromEnv('NOTIFY_RETRY_LIMIT') || 0;
    this.notifyBatchSize = this.getNumberFromEnv('NOTIFY_BATCH_SIZE') || 250;
    this.notifyRequestsPerBatch = this.getNumberFromEnv('NOTIFY_REQUESTS_PER_BATCH') || 25;
    this.notifyTimeout = this.getNumberFromEnv('NOTIFY_TIMEOUT') || 10000;
    this.resultsBaseApiUrl = this.getFromEnvThrowIfNotPresent('RESULTS_API_BASE_URL');

    this.englishEmailPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_PASS_TEMPLATE_ID');
    this.englishEmailFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_FAIL_TEMPLATE_ID');
    this.welshEmailPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_PASS_TEMPLATE_ID');
    this.welshEmailFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_FAIL_TEMPLATE_ID');

    this.englishLetterPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_PASS_TEMPLATE_ID');
    this.englishLetterFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_FAIL_TEMPLATE_ID');
    this.welshLetterPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_PASS_TEMPLATE_ID');
    this.welshLetterFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_FAIL_TEMPLATE_ID');

    // VOCATIONAL Email
    this.englishEmailPassTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_PASS_TEMPLATE_ID_VOCATIONAL');
    this.englishEmailFailTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_FAIL_TEMPLATE_ID_VOCATIONAL');
    this.welshEmailPassTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_PASS_TEMPLATE_ID_VOCATIONAL');
    this.welshEmailFailTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_FAIL_TEMPLATE_ID_VOCATIONAL');
    // VOCATIONAL Letter
    this.englishLetterPassTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_POST_PASS_TEMPLATE_ID_VOCATIONAL');
    this.englishLetterFailTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_POST_FAIL_TEMPLATE_ID_VOCATIONAL');
    this.welshLetterPassTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_PASS_TEMPLATE_ID_VOCATIONAL');
    this.welshLetterFailTemplateIdVocational =
      this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_FAIL_TEMPLATE_ID_VOCATIONAL');
    // AMOD1 Email
    this.englishEmailPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_PASS_TEMPLATE_ID_AMOD1');
    this.englishEmailFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_FAIL_TEMPLATE_ID_AMOD1');
    this.welshEmailPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_PASS_TEMPLATE_ID_AMOD1');
    this.welshEmailFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_FAIL_TEMPLATE_ID_AMOD1');
    // AMOD1 Letter
    this.englishLetterPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_PASS_TEMPLATE_ID_AMOD1');
    this.englishLetterFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_FAIL_TEMPLATE_ID_AMOD1');
    this.welshLetterPassTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_PASS_TEMPLATE_ID_AMOD1');
    this.welshLetterFailTemplateIdAMod1 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_FAIL_TEMPLATE_ID_AMOD1');
    // AMOD2 Email
    this.englishEmailPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_PASS_TEMPLATE_ID_AMOD2');
    this.englishEmailFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_FAIL_TEMPLATE_ID_AMOD2');
    this.welshEmailPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_PASS_WELSH_TEMPLATE_ID_AMOD2');
    this.welshEmailFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_FAIL_WELSH_TEMPLATE_ID_AMOD2');
    // AMOD2 Letter
    this.englishLetterPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_PASS_TEMPLATE_ID_AMOD2');
    this.englishLetterFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_FAIL_TEMPLATE_ID_AMOD2');
    this.welshLetterPassTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_PASS_WELSH_TEMPLATE_ID_AMOD2');
    this.welshLetterFailTemplateIdAMod2 = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_FAIL_WELSH_TEMPLATE_ID_AMOD2');
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
