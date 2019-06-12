import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

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

export const completedCatBTest: StandardCarTestCATBSchema = {
  id: '12345',
  category: 'B',
  activityCode: '1',
  journalData: {
    applicationReference: {
      applicationId: 12345,
      bookingSequence: 6789,
      checkDigit: 0,
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
    },
    examiner: {
      staffNumber: '123456',
    },
    testCentre: {
      centreId: 123456,
      costCode: '123456',
    },
    testSlotAttributes: {
      slotId: 123456,
      vehicleSlotType: 'B',
      start: '09:00',
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
};