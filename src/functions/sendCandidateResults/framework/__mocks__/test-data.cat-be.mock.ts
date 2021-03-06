import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const mockEmail1 = 'simulate-delivered@notifications.service.gov.uk';
export const mockEmail2 = 'simulate-delivered-2@notifications.service.gov.uk';
export const mockEmail3 = 'simulate-delivered-3@notifications.service.gov.uk';

export const temporaryFailureEmail = 'temp-fail@simulator.notify';
export const permanentFailureEmail = 'perm-fail@simulator.notify';

export const mockPhoneNumber1 = '07700900000';
export const mockPhoneNumber2 = '07700900111';
export const mockPhoneNumber3 = '07700900222';

export const temporaryFailurePhoneNumber = '07700900003';
export const permanentFailurePhoneNumber = '07700900002';

export const completedCatBETest: CatBEUniqueTypes.TestResult = {
  version: '0.1.1',
  category: 'B+E',
  activityCode: '1',
  journalData: {
    applicationReference: {
      applicationId: 12345671,
      bookingSequence: 1,
      checkDigit: 1,
    },
    candidate: {
      candidateId: 1,
      driverNumber: 'ABC 12345 EFG',
      candidateName: {
        title: 'Mr',
        firstName: 'Joe',
        secondName: 'Alex',
        thirdName: 'Fred',
        lastName: 'Bloggs',
      },
      candidateAddress: {
        addressLine1: 'The Occupier',
        addressLine2: '123 High Street',
        addressLine3: 'Richmond upon Thames',
        addressLine4: 'London',
        addressLine5: 'Middlesex',
        postcode: 'SW14 6BH',
      },
      emailAddress: mockEmail1,
      primaryTelephone: mockPhoneNumber1,
      secondaryTelephone: mockPhoneNumber2,
      mobileTelephone: mockPhoneNumber3,
      businessAddress: {
        addressLine1: 'The Occupier',
        addressLine2: '123 High Street',
        addressLine3: 'Richmond upon Thames',
        addressLine4: 'London',
        addressLine5: 'Middlesex',
        postcode: 'SW14 6BH',
      },
      businessName: '',
      businessTelephone: '',
    },
    examiner: {
      staffNumber: '123456',
    },
    testCentre: {
      centreId: 123456,
      costCode: '123456',
      centreName: 'Test Centre 001',
    },
    testSlotAttributes: {
      slotId: 123456,
      vehicleTypeCode: 'B+E',
      start: '2019-07-31T11:48:51',
      welshTest: false,
      specialNeeds: false,
      extendedTest: false,
    },
  },
  communicationPreferences: {
    communicationMethod: 'Email',
    conductedLanguage: 'English',
    updatedEmail: mockEmail2,
  },
  rekey: false,
  changeMarker: false,
  examinerBooked: 12345678,
  examinerConducted: 12345678,
  examinerKeyed: 12345678,
  testData: {
    uncoupleRecouple: {
      fault: 'D',
      selected: true,
      faultComments: 'controlFaultComments',
    },
    testRequirements: {
      normalStart1: true,
      normalStart2: false,
      angledStartControlledStop: false,
      downhillStart: false,
      uphillStart: false,
    },
    manoeuvres: {
      reverseLeft: {
        selected: true,
        controlFault: 'S',
        controlFaultComments: 'controlFaultComments',
        observationFault: 'S',
        observationFaultComments: 'observationFaultComments',
      },
    },
    vehicleChecks: {
      showMeQuestions: [
        {
          code: '1',
          description: '',
          outcome: 'DF',
        },
        {
          code: '2',
          description: '',
          outcome: 'DF',
        },
        {
          code: '3',
          description: '',
          outcome: 'DF',
        },
      ],
      showMeTellMeComments: '',
      tellMeQuestions: [
        {
          code: '4',
          description: '',
          outcome: 'DF',
        },
        {
          code: '5',
          description: '',
          outcome: 'DF',
        },
      ],
    },
    ETA: {
      verbal: true,
      physical: false,
    },
    drivingFaults: {
      moveOffControl: 2,
      moveOffSafety: 1,
    },
    seriousFaults: {
      moveOffControl: true,
      moveOffSafety: true,
    },
    dangerousFaults: {
      moveOffControl: true,
      moveOffSafety: true,
    },
  },
};
