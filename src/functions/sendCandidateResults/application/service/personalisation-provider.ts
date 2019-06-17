import { LetterPersonalisation, EmailPersonalisation, Personalisation } from '../../domain/personalisation.model';
import { StandardCarTestCATBSchema, Candidate, Name } from '@dvsa/mes-test-schema/categories/B';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../framework/di/types';
import { IFaultProvider } from './fault-provider';
import { get } from 'lodash';
import { Fault } from '../../domain/fault';

export interface IPersonalisationProvider {

  getEmailPersonalisation (testresult: StandardCarTestCATBSchema) : EmailPersonalisation;

  getLetterPersonalisation (testresult: StandardCarTestCATBSchema) : LetterPersonalisation;
}

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
    return {
      firstName: get(testresult, 'journalData.candidate.candidateName.firstName'),
      lastName: get(testresult,  'journalData.candidate.candidateName.lastName') ,
      applicationReference: get(testresult, 'journalData.applicationReference.applicationId').toString(),
      category: testresult.category,
      date: get(testresult, 'journalData.testSlotAttributes.start'),
      drivingFaults: this.buildFaultString(this.faultProvider.getDrivingFaults(testresult.testData)),
      seriousFaults: this.buildFaultString(this.faultProvider.getSeriousFaults(testresult.testData)),
      dangerousFaults: this.buildFaultString(this.faultProvider.getDangerousFaults(testresult.testData)),
    };
  }

  private buildFaultString(faults: Fault[]): string {
    let faultString = '';

    faults.forEach(fault => faultString = faultString.concat(`${fault.name} - ${fault.count} <br/>`));

    return faultString;
  }

  private getTitledName(name: Name | undefined): string {
    if (name) {
      return `${name.title} ${name.firstName} ${name.lastName}`;
    }
    return '';
  }
}
