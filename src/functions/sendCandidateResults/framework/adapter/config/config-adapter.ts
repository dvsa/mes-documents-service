import { IConfigAdapter } from './config-adapter.interface';
import { injectable } from 'inversify';

@injectable()
export class ConfigAdapter implements IConfigAdapter {

  isLocal: boolean;
  useNotify: boolean;
  retryLimit: number;
  apiKey: string;
  resultsBaseApiUrl: string;
  notifyBatchSize: number;
  notifyTimeoutLimit: number;
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

  constructor() {
    this.isLocal = this.getBooleanFromEnv('IS_LOCAL');
    this.useNotify = this.getBooleanFromEnv('USE_NOTIFY');
    this.retryLimit = this.getNumberFromEnv('NOTIFY_RETRY_LIMIT') || 0;
    this.notifyBatchSize = this.getNumberFromEnv('NOTIFY_BATCH_SIZE') || 250;
    this.notifyTimeoutLimit = this.getNumberFromEnv('NOTIFY_TIMEOUT_LIMIT') || 10000;
    this.apiKey = this.getFromEnvThrowIfNotPresent('NOTIFY_API_KEY');
    this.resultsBaseApiUrl = this.getFromEnvThrowIfNotPresent('RESULTS_API_BASE_URL');

    this.englishEmailPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_PASS_TEMPLATE_ID');
    this.englishEmailFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_FAIL_TEMPLATE_ID');
    this.welshEmailPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_PASS_TEMPLATE_ID');
    this.welshEmailFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_EMAIL_WELSH_FAIL_TEMPLATE_ID');

    this.englishLetterPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_PASS_TEMPLATE_ID');
    this.englishLetterFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_FAIL_TEMPLATE_ID');
    this.welshLetterPassTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_PASS_TEMPLATE_ID');
    this.welshLetterFailTemplateId = this.getFromEnvThrowIfNotPresent('NOTIFY_POST_WELSH_FAIL_TEMPLATE_ID');
  }

  protected getNumberFromEnv(envvarName: string): number | null {
    const asNumber = Number.parseInt(process.env[envvarName] || '', 10);
    return Number.isNaN(asNumber) ? null : asNumber;
  }

  protected getBooleanFromEnv(envvarName: string) : boolean {
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
