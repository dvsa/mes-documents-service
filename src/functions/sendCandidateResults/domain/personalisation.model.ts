import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatCPCCustomProperties } from '../application/service/categories/CPC/custom-property-provider-cat-cpc';
import { CatADI3CustomProperties } from '../application/service/categories/ADI3/custom-property-provider-cat-adi3';
import { CatAMod1ICustomProperties } from '../application/service/categories/AM1/custom-property-provider-cat-a-mod1';

export enum PositionText {
  IN = 'in',
  ON = 'on',
}

export interface Personalisation {
  applicationReference: number;
  category: TestCategory;
  date: string;
  location: string;

  drivingFaults: string[] | string;
  showDrivingFaults: boolean;

  seriousFaults: string[] | string;
  showSeriousFaults: boolean;

  dangerousFaults: string[] | string;
  showDangerousFaults: boolean;

  showEcoText: boolean;

  showEtaText: boolean;
  showEtaVerbal: boolean;
  showEtaPhysical: boolean;

  showProvLicenceRetainedByDvsa: boolean;
  showProvLicenceRetainedByDriver: boolean;
}

export interface PersonalisationDetails extends Personalisation,
  Partial<CatCPCCustomProperties>,
  Partial<CatADI3CustomProperties>,
  Partial<CatAMod1ICustomProperties>
{
  candidateName: string;
  'address_line_1': string;
  'address_line_2': string;
  'address_line_3'?: string;
  'address_line_4'?: string;
  'address_line_5'?: string;
  'address_line_6'?: string;
  'postcode': string;
}
