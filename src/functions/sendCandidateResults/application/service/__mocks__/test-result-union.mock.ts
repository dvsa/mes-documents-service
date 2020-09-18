import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

const testResultUnionMock: TestResultSchemasUnion = {
  version: 'version 1',
  category: 'B',
  activityCode: '1',
  journalData: {
    applicationReference: {
      applicationId: 12345671,
      bookingSequence: 1,
      checkDigit: 1,
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
      vehicleTypeCode: 'B',
      start: '2019-07-31T11:48:51',
      welshTest: false,
      specialNeeds: false,
      extendedTest: false,
    },
    candidate: {},
  },
  rekey: false,
  changeMarker: false,
  examinerBooked: 12345678,
  examinerConducted: 12345678,
  examinerKeyed: 12345678,
};

export default testResultUnionMock;
