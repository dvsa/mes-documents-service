import { LetterPersonalisation, EmailPersonalisation, Personalisation } from '../../domain/personalisation.model';
import {
  StandardCarTestCATBSchema,
  Name, ApplicationReference,
  ConductedLanguage,
} from '@dvsa/mes-test-schema/categories/B';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../framework/di/types';
import { IFaultProvider } from './fault-provider';
import { get } from 'lodash';
import { Fault } from '../../domain/fault';
import { englishCompetencyLabels, welshCompetencyLabels } from '../../domain/competencies';

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
      this.faultProvider.getSeriousFaults(testresult.testData, testresult.activityCode),
      get(testresult, 'communicationPreferences.conductedLanguage'));

    const dangerousFaults = this.buildFaultString(
        this.faultProvider.getDangerousFaults(testresult.testData),
        get(testresult, 'communicationPreferences.conductedLanguage'));

    return {
      drivingFaults,
      seriousFaults,
      dangerousFaults,
      firstName: get(testresult, 'journalData.candidate.candidateName.firstName'),
      lastName: get(testresult,  'journalData.candidate.candidateName.lastName') ,
      applicationReference: this.getApplicationRef(get(testresult, 'journalData.applicationReference')),
      category: testresult.category,
      date: get(testresult, 'journalData.testSlotAttributes.start'),
      driverNumber: get(testresult, 'journalData.candidate.driverNumber'),
    };
  }

  private buildFaultString(faults: Fault[], language: ConductedLanguage): string {
    let faultString = '';

    if (language === 'Cymraeg') {
      faults.forEach(fault => faultString = faultString.concat(`* ${welshCompetencyLabels[fault.name]}`));
    } else {
      faults.forEach(fault => faultString = faultString.concat(`* ${englishCompetencyLabels[fault.name]}`));
    }

    return faultString;
  }

  private buildFaultStringWithCount(faults: Fault[], language: ConductedLanguage): string {
    let faultString = '';

    if (language === 'Cymraeg') {
      faults.forEach(fault =>
        faultString = faultString.concat(`* ${welshCompetencyLabels[fault.name]} - ${fault.count}`));
    } else {
      faults.forEach(fault =>
        faultString = faultString.concat(`* ${englishCompetencyLabels[fault.name]} - ${fault.count}`));
    }

    return faultString;
  }

  private getTitledName(name: Name | undefined): string {
    if (name) {
      return `${name.title} ${name.firstName} ${name.lastName}`;
    }
    return '';
  }

  private getApplicationRef (ref: ApplicationReference) {
    return `${ref.applicationId}${ref.bookingSequence}${ref.checkDigit}`;
  }
}
