import {injectable} from 'inversify';
import {isEmpty} from 'lodash';
import * as awsSdk from 'aws-sdk';

export interface ITemplateAdapter {
  getTemplateIDsJson(): Promise<object>;
}

@injectable()
export class TemplateAdapter implements ITemplateAdapter {
  private templateIDsJson: any;

  constructor() {
    this.templateIDsJson = '';
  }

  public async getTemplateIDsJson(): Promise<any> {
    if (!isEmpty(this.templateIDsJson)) {
      return Promise.resolve(this.templateIDsJson);
    }

    const documentServiceSecretName = this.getFromEnvThrowIfNotPresent('SECRET_NAME');

    const secretsManager = new awsSdk.SecretsManager();

    const params: awsSdk.SecretsManager.GetSecretValueRequest = { SecretId: documentServiceSecretName };

    try {
      const secretValue = await secretsManager.getSecretValue(params).promise();

      const secrets = JSON.parse(secretValue.SecretString || '');

      if (isEmpty(secrets)) {
        throw new Error('secret string was empty');
      }

      return Promise.resolve(JSON.parse(secrets['TEMPLATE_IDS']));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  protected getFromEnvThrowIfNotPresent(envvarName: string): string {
    const envvarVal = process.env[envvarName];
    if (envvarVal === undefined || envvarVal.trim().length === 0) {
      throw new Error(`Couldn't find envvar ${envvarName}`);
    }
    return envvarVal as string;
  }
}
