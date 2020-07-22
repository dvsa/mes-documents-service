import { TestResultCatAM1Schema } from '@dvsa/mes-test-schema/categories/AM1';

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

export const completedCatAMod1Test: TestResultCatAM1Schema = {
  version: '3.19.1',
  category: 'EUA2M1',
  activityCode: '1',
  journalData: {
    examiner: {
      staffNumber: '01234567',
      individualId: 9000000,
    },
    testCentre: {
      centreId: 54321,
      costCode: 'EXTC1',
      centreName: 'Test Centre 001',
    },
    testSlotAttributes: {
      welshTest: false,
      slotId: 1019,
      start: '2019-07-31T11:48:51',
      specialNeeds: false,
      specialNeedsCode: 'NONE',
      specialNeedsArray: [
        'None',
      ],
      vehicleTypeCode: 'C',
      extendedTest: false,
      examinerVisiting: false,
      entitlementCheck: false,
      slotType: 'Standard Test',
    },
    candidate: {
      candidateAddress: {
        addressLine1: '1 Hangar Lane',
        addressLine2: 'Someplace',
        addressLine3: 'Sometown',
        postcode: 'AB78 9CD',
      },
      candidateId: 108,
      candidateName: {
        firstName: 'Jenny',
        lastName: 'Lewis',
        title: 'Dr',
      },
      driverNumber: 'LEWIS375220A99HC',
      gender: 'F',
      primaryTelephone: '01234 567890',
      dateOfBirth: '1973-09-06',
      ethnicityCode: 'A',
    },
    applicationReference: {
      applicationId: 1234502,
      bookingSequence: 7,
      checkDigit: 7,
    },
  },
  preTestDeclarations: {
    insuranceDeclarationAccepted: true,
    residencyDeclarationAccepted: true,
    preTestSignature: 'data:image/svg+xml;base64,PHN2ZyB',
    DL196CBTCertNumber: '',
  },
  accompaniment: {},
  vehicleDetails: {
    registrationNumber: 'YY77YYY',
    gearboxCategory: 'Manual',
  },
  testData: {
    singleFaultCompetencies: {},
    drivingFaults: {
      moveOffControl: 1,
      moveOffSafety: 3,
    },
    dangerousFaults: {
      moveOffControl: true,
      moveOffSafety: true,
    },
    seriousFaults: {
      moveOffControl: true,
      moveOffSafety: true,
    },
    emergencyStop: {
      firstAttempt: 44,
      secondAttempt: 47,
    },
    avoidance: {
      firstAttempt: 30,
      secondAttempt: 38,
    },
    ETA: {},
  },
  passCompletion: {
    passCertificateNumber: '',
  },
  postTestDeclarations: {
    healthDeclarationAccepted: false,
    passCertificateNumberReceived: false,
    postTestSignature: '',
  },
  testSummary: {
    routeNumber: 88,
    candidateDescription: '',
    additionalInformation: '',
    weatherConditions: [],
    debriefWitnessed: true,
    D255: true,
    identification: 'Licence',
  },
  communicationPreferences: {
    updatedEmail: '',
    communicationMethod: 'Post',
    conductedLanguage: 'English',
  },
  rekey: false,
  examinerBooked: 1234567,
  examinerConducted: 1234567,
  examinerKeyed: 1234567,
  changeMarker: false,
};
