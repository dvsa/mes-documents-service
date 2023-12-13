import { injectable } from 'inversify';
import { GetSecretValueCommand, GetSecretValueCommandInput, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { isEmpty } from 'lodash';
import { IConfigAdapter } from './config-adapter.interface';

@injectable()
export class ConfigAdapter implements IConfigAdapter {

  private readonly apiKey: string;

  isLocal: boolean;
  useNotify: boolean;
  retryLimit: number;
  resultsBaseApiUrl: string;
  notifyBatchSize: number;
  notifyRequestsPerBatch: number;
  notifyTimeout: number;
  // Email Template id's
  EmailTemplateId: string;
  // Letter Template id's
  LetterTemplateId: string;

  constructor() {
    this.apiKey = '';
    this.isLocal = this.getBooleanFromEnv('IS_LOCAL');
    this.useNotify = this.getBooleanFromEnv('USE_NOTIFY');
    this.retryLimit = this.getNumberFromEnv('RETRY_LIMIT') || 0;
    this.notifyBatchSize = this.getNumberFromEnv('BATCH_SIZE') || 250;
    this.notifyRequestsPerBatch = this.getNumberFromEnv('REQ_PER_BATCH') || 25;
    this.notifyTimeout = this.getNumberFromEnv('TIMEOUT_IN_MS') || 10000;
    this.resultsBaseApiUrl = this.getFromEnvThrowIfNotPresent('RESULTS_API_BASE_URL');

    // Email template id
    this.EmailTemplateId = this.getFromEnvThrowIfNotPresent('E_TEMPLATE');
    // Letter template id
    this.LetterTemplateId = this.getFromEnvThrowIfNotPresent('P_TEMPLATE');
  }

  public async getApiKey(): Promise<string> {
    if (!isEmpty(this.apiKey)) {
      return Promise.resolve(this.apiKey);
    }

    if (this.isLocal) {
      return Promise.resolve(this.getFromEnvThrowIfNotPresent('NOTIFY_API_KEY'));
    }

    const documentServiceSecretName = this.getFromEnvThrowIfNotPresent('SECRET_NAME');

    const params: GetSecretValueCommandInput = {
      SecretId: documentServiceSecretName,
    };

    try {
      const secretValue = await new SecretsManager().send(
        new GetSecretValueCommand(params)
      );
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
