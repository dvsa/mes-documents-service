import {
  LetterPersonalisation,
  EmailPersonalisation,
  Personalisation,
  BooleanText,
} from '../../domain/personalisation.model';
import {
  Name,
  ConductedLanguage,
  Eco,
  ETA,
  TestData,
  CategoryCode,
} from '@dvsa/mes-test-schema/categories/common';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../framework/di/types';
import { IFaultProvider } from './fault-provider';
import { ICustomPropertyProvider } from './custom-property-provider';
import { get } from 'lodash';
import { Fault } from '../../domain/fault';
import {
  englishCompetencyLabels,
  modifiedEnglishCompetencyLabels,
  welshCompetencyLabels,
} from '../../domain/competencies';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import * as moment from 'moment';
import 'moment/locale/cy';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { isBikeCategory } from './template-id-provider';

export interface IPersonalisationProvider {

  getEmailPersonalisation(testresult: TestResultSchemasUnion): EmailPersonalisation;

  getLetterPersonalisation(testresult: TestResultSchemasUnion): LetterPersonalisation;
}

@injectable()
export class PersonalisationProvider implements IPersonalisationProvider {

  constructor(
    @inject(TYPES.IFaultProvider) private faultProvider: IFaultProvider,
    @inject(TYPES.ICustomPropertyProvider) private customPropertyProvider: ICustomPropertyProvider,
  ) { }

  public getEmailPersonalisation(testresult: TestResultSchemasUnion): EmailPersonalisation {
    const sharedValues: Personalisation = this.getSharedPersonalisationValues(testresult);

    return {
      ...sharedValues,
    };
  }

  public getLetterPersonalisation(testresult: TestResultSchemasUnion): LetterPersonalisation {
    const sharedValues: Personalisation = this.getSharedPersonalisationValues(testresult);

    return {
      ...sharedValues,
      address_line_1: this.getTitledName(testresult.journalData.candidate.candidateName),
      address_line_2: get(testresult, 'journalData.candidate.candidateAddress.addressLine1'),
      address_line_3: get(testresult, 'journalData.candidate.candidateAddress.addressLine2'),
      address_line_4: get(testresult, 'journalData.candidate.candidateAddress.addressLine3'),
      address_line_5: get(testresult, 'journalData.candidate.candidateAddress.addressLine4'),
      address_line_6: get(testresult, 'journalData.candidate.candidateAddress.addressLine5'),
      postcode: get(testresult, 'journalData.candidate.candidateAddress.postcode'),
    };
  }

  private getSharedPersonalisationValues(testresult: TestResultSchemasUnion): Personalisation {
    return {
      ...this.getCommonPersonalisationValues(testresult),
      ...this.customPropertyProvider.getCustomProperties(testresult),
    };
  }

  private getCommonPersonalisationValues(testresult: TestResultSchemasUnion): Personalisation {
    const testData = get(testresult, 'testData') as TestData;
    const drivingFaults = this.buildFaultStringWithCount(
      this.faultProvider
        .getDrivingFaults(testData, testresult.category)
        .sort((a, b) => b.count - a.count),
      get(testresult, 'communicationPreferences.conductedLanguage'),
      testresult.category);

    const seriousFaults = this.buildFaultString(
      this.faultProvider.getSeriousFaults(testData, testresult.category),
      get(testresult, 'communicationPreferences.conductedLanguage'),
      testresult.category);

    const dangerousFaults = this.buildFaultString(
      this.faultProvider.getDangerousFaults(testData, testresult.category),
      get(testresult, 'communicationPreferences.conductedLanguage'),
      testresult.category);

    const eta = get(testresult, 'testData.ETA', null);

    return {
      applicationReference: formatApplicationReference(get(testresult, 'journalData.applicationReference')),
      category: testresult.category,
      date: this.formatDate(
        get(testresult, 'journalData.testSlotAttributes.start'),
        get(testresult, 'communicationPreferences.conductedLanguage'),
      ),
      location: get(testresult, 'journalData.testCentre.centreName'),

      drivingFaults: drivingFaults.length > 0 ? drivingFaults : '',
      showDrivingFaults: drivingFaults.length > 0 ? BooleanText.YES : BooleanText.NO,

      seriousFaults: seriousFaults.length > 0 ? seriousFaults : '',
      showSeriousFaults: seriousFaults.length > 0 ? BooleanText.YES : BooleanText.NO,

      dangerousFaults: dangerousFaults.length > 0 ? dangerousFaults : '',
      showDangerousFaults: dangerousFaults.length > 0 ? BooleanText.YES : BooleanText.NO,

      showEcoText: this.shouldShowEco(get(testresult, 'testData.eco', null)),

      showEtaText: this.shouldShowEta(eta),
      showEtaVerbal: this.shouldShowEtaVerbal(eta),
      showEtaPhysical: this.shouldShowEtaPhysical(eta),

    };
  }

  private buildFaultString(faults: Fault[], language: ConductedLanguage, category: CategoryCode): string[] {
    const faultLabels: string[] = [];

    if (language === 'Cymraeg') {
      faults.forEach((fault: any) => faultLabels.push(`${(<any>welshCompetencyLabels)[fault.name]}`));
    } else {
      faults.forEach((fault: any) => faultLabels.push(
        `${this.modifyCompetencyLabel((<any>englishCompetencyLabels)[fault.name], category)}`));
    }

    return faultLabels;
  }

  private buildFaultStringWithCount(faults: Fault[], language: ConductedLanguage, category: CategoryCode): string[] {
    const faultLabels: string[] = [];

    if (language === 'Cymraeg') {
      faults.forEach((fault: any) => faultLabels.push(`${(<any>welshCompetencyLabels)[fault.name]}, ${fault.count}`));
    } else {
      faults.forEach((fault: any) => faultLabels.push(
        `${this.modifyCompetencyLabel((<any>englishCompetencyLabels)[fault.name], category)}, ${fault.count}`));
    }
    return faultLabels;
  }

  private getTitledName(name: Name | undefined): string {
    if (name) {
      return `${name.title} ${name.firstName} ${name.lastName}`;
    }
    return '';
  }

  private shouldShowEco(eco: Eco): BooleanText {
    if (!eco) {
      return BooleanText.NO;
    }
    if (eco.adviceGivenControl || eco.adviceGivenPlanning) {
      return BooleanText.YES;
    }
    return BooleanText.NO;
  }

  private shouldShowEta(eta: ETA): BooleanText {
    return eta && (eta.physical || eta.verbal) ? BooleanText.YES : BooleanText.NO;
  }

  private shouldShowEtaPhysical(eta: ETA): BooleanText {
    return eta && eta.physical ? BooleanText.YES : BooleanText.NO;
  }

  private shouldShowEtaVerbal(eta: ETA): BooleanText {
    return eta && eta.verbal ? BooleanText.YES : BooleanText.NO;
  }

  private formatDate(stringDate: Date, language: ConductedLanguage): string {
    switch (language) {
      case 'Cymraeg': return moment(stringDate).locale('cy').format('D MMMM YYYY');
      default: return moment(stringDate).locale('en').format('D MMMM YYYY');
    }
  }

  private modifyCompetencyLabel = (label: string, category: CategoryCode): string => {
    if (isBikeCategory(category)) {
      switch (label) {
        case englishCompetencyLabels.moveOffControl: return modifiedEnglishCompetencyLabels.moveOffControl;
        case englishCompetencyLabels.moveOffSafety: return modifiedEnglishCompetencyLabels.moveOffSafety;
        default: return label;
      }
    }
    return label;
  }
}
