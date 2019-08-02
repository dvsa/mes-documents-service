import {
  LetterPersonalisation,
  EmailPersonalisation,
  Personalisation,
  BooleanText,
} from '../../domain/personalisation.model';
import {
  StandardCarTestCATBSchema,
  Name, ApplicationReference,
  ConductedLanguage,
  Eco,
} from '@dvsa/mes-test-schema/categories/B';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../framework/di/types';
import { IFaultProvider } from './fault-provider';
import { get } from 'lodash';
import { Fault } from '../../domain/fault';
import { englishCompetencyLabels, welshCompetencyLabels } from '../../domain/competencies';
import { formatApplicationReference } from '@dvsa/mes-microservice-common/domain/tars';
import * as moment from 'moment';

export interface IPersonalisationProvider {

  getEmailPersonalisation (testresult: StandardCarTestCATBSchema) : EmailPersonalisation;

  getLetterPersonalisation (testresult: StandardCarTestCATBSchema) : LetterPersonalisation;
}

@injectable()
export class PersonalisationProvider implements IPersonalisationProvider {

  constructor(
      @inject(TYPES.IFaultProvider) private faultProvider : IFaultProvider,
  ) {}

  public getEmailPersonalisation (testresult: StandardCarTestCATBSchema) : EmailPersonalisation {
    const sharedValues: Personalisation = this.getSharedPersonalisationValues(testresult);

    return {
      ...sharedValues,
    };
  }

  public getLetterPersonalisation (testresult: StandardCarTestCATBSchema) : LetterPersonalisation {
    const sharedValues: Personalisation = this.getSharedPersonalisationValues(testresult);

    return {
      ...sharedValues,
      address_line_1: this.getTitledName(testresult.journalData.candidate.candidateName),
      address_line_2:get(testresult, 'journalData.candidate.candidateAddress.addressLine1'),
      address_line_3: get(testresult, 'journalData.candidate.candidateAddress.addressLine2'),
      address_line_4: get(testresult, 'journalData.candidate.candidateAddress.addressLine3'),
      address_line_5: get(testresult, 'journalData.candidate.candidateAddress.addressLine4'),
      address_line_6: get(testresult, 'journalData.candidate.candidateAddress.addressLine5'),
      postcode: get(testresult, 'journalData.candidate.candidateAddress.postcode'),
    };
  }

  private getSharedPersonalisationValues(testresult: StandardCarTestCATBSchema) : Personalisation {

    const drivingFaults = this.buildFaultStringWithCount(
      this.faultProvider.getDrivingFaults(testresult.testData),
      get(testresult, 'communicationPreferences.conductedLanguage'));

    const seriousFaults = this.buildFaultString(
      this.faultProvider.getSeriousFaults(testresult.testData),
      get(testresult, 'communicationPreferences.conductedLanguage'));

    const dangerousFaults = this.buildFaultString(
        this.faultProvider.getDangerousFaults(testresult.testData),
        get(testresult, 'communicationPreferences.conductedLanguage'));

    return {
      firstName: get(testresult, 'journalData.candidate.candidateName.firstName'),
      lastName: get(testresult,  'journalData.candidate.candidateName.lastName') ,
      applicationReference: formatApplicationReference(get(testresult, 'journalData.applicationReference')),
      category: testresult.category,
      date: this.formatDate(get(testresult, 'journalData.testSlotAttributes.start')),
      driverNumber: get(testresult, 'journalData.candidate.driverNumber'),
      location: get(testresult, 'journalData.testCentre.centreName'),

      drivingFaults: drivingFaults.length > 0 ? drivingFaults  :'' ,
      drivingFaultsCount: drivingFaults.length.toString(),
      showDrivingFaults: drivingFaults.length > 0 ? BooleanText.YES : BooleanText.NO,

      seriousFaults: seriousFaults.length > 0 ? seriousFaults  :'' ,
      seriousFaultsCount: seriousFaults.length.toString(),
      showSeriousFaults: seriousFaults.length > 0 ? BooleanText.YES : BooleanText.NO,

      dangerousFaults: dangerousFaults.length > 0 ? dangerousFaults  :'' ,
      dangerousFaultsCount: dangerousFaults.length.toString(),
      showDangerousFaults: dangerousFaults.length > 0 ? BooleanText.YES : BooleanText.NO,

      showEcoText: this.shouldShowEco(get(testresult , 'testData.eco', null)),
    };
  }

  private buildFaultString(faults: Fault[], language: ConductedLanguage): string[] {
    const faultLabels: string [] = [];

    if (language === 'Cymraeg') {
      faults.forEach(fault => faultLabels.push(`${welshCompetencyLabels[fault.name]}`));
    } else {
      faults.forEach(fault => faultLabels.push(`${englishCompetencyLabels[fault.name]}`));
    }

    return faultLabels;
  }

  private buildFaultStringWithCount(faults: Fault[], language: ConductedLanguage): string[] {
    const faultLabels: string[] = [];

    if (language === 'Cymraeg') {
      faults.forEach(fault =>
        faultLabels.push(`${welshCompetencyLabels[fault.name]}, ${fault.count}`));
    } else {
      faults.forEach(fault =>
        faultLabels.push(`${englishCompetencyLabels[fault.name]}, ${fault.count}`));
    }

    return faultLabels;
  }

  private getTitledName(name: Name | undefined): string {
    if (name) {
      return `${name.title} ${name.firstName} ${name.lastName}`;
    }
    return '';
  }

  private shouldShowEco(eco: Eco) : BooleanText {
    if (!eco) {
      return BooleanText.NO;
    }
    if (eco.adviceGivenControl || eco.adviceGivenPlanning) {
      return BooleanText.YES;
    }
    return BooleanText.NO;
  }

  private formatDate(stringDate: Date): string {
    return moment(stringDate).format('D MMMM YYYY');
  }
}
