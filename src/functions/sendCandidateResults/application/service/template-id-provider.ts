import {
  CommunicationMethod,
} from '@dvsa/mes-test-schema/categories/common';
import { inject, injectable } from 'inversify';
import { get } from 'lodash';

import { IConfigAdapter } from '../../framework/adapter/config/config-adapter.interface';
import {
  Correspondence,
} from '../../domain/template-id.model';
import { TYPES } from '../../framework/di/types';

export interface ITemplateIdProvider {
  getTemplateId(
    communicationMethod: CommunicationMethod,
  ): string;
}

@injectable()
export class TemplateIdProvider implements ITemplateIdProvider {
  static TEMPLATE_ID_NOT_SET = 'Template Id not set';

  constructor(
    @inject(TYPES.IConfigAdapter) public configAdapter: IConfigAdapter) {
  }

  getTemplateId(
    communicationMethod: CommunicationMethod,
  ): string {

    const baseTemplate: string = getTemplateString(
      communicationMethod,
    );

    if (baseTemplate === TemplateIdProvider.TEMPLATE_ID_NOT_SET) {
      return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
    }

    return get<IConfigAdapter, string>(this.configAdapter, baseTemplate);
  }
}

export function getTemplateString(
  communicationMethod: CommunicationMethod,
): string {

  switch (communicationMethod) {
  case Correspondence.EMAIL:
    return `${Correspondence.EMAIL}TemplateId`;
  case Correspondence.POST:
    return `${Correspondence.LETTER}TemplateId`;
  default:
    return TemplateIdProvider.TEMPLATE_ID_NOT_SET;
  }
}
