import {
  Question,
  TestData as CatADI3TestData,
} from '@dvsa/mes-test-schema/categories/ADI3';

import {
  CatADI3CustomProperties, getCustomPropertiesCatADI3,
} from '../custom-property-provider-cat-adi3';

const getQuestion = (questionNumber: number, score: number) => {
  return {
    title: `Title of Q${questionNumber}`,
    score,
  } as Question;
};

describe('Custom-property-provider-cat-adi3', () => {
  it('should use default values of 0 for the scores when not set', () => {
    const td = {
      lessonPlanning: {
        q1: getQuestion(1, 0),
        q2: getQuestion(2, 0),
        q3: getQuestion(3, 0),
        q4: getQuestion(4, 0),
        score: 0,
      },
      riskManagement: {
        q1: getQuestion(1, 0),
        q2: getQuestion(2, 0),
        q3: getQuestion(3, 0),
        q4: getQuestion(4, 0),
        q5: getQuestion(4, 0),
        score: 0,
      },
      teachingLearningStrategies: {
        q1: getQuestion(1, 0),
        q2: getQuestion(2, 0),
        q3: getQuestion(3, 0),
        q4: getQuestion(4, 0),
        q5: getQuestion(4, 0),
        q6: getQuestion(4, 0),
        q7: getQuestion(4, 0),
        q8: getQuestion(4, 0),
        score: 0,
      },
      review: { grade: 'B', feedback: 'Mock feedback' },
      lessonAndTheme: { studentLevel: 'beginner', lessonThemes: [], other: 'Mock Lesson Theme' },
    } as CatADI3TestData;

    expect(getCustomPropertiesCatADI3(td, '3', '123', 'ADI3')).toEqual({
      prn: '123',
      lessonPlanningScore: '0',
      lp1Score: '0',
      lp2Score: '0',
      lp3Score: '0',
      lp4Score: '0',
      riskManagementScore: '0',
      rm1Score: '0',
      rm2Score: '0',
      rm3Score: '0',
      rm4Score: '0',
      rm5Score: '0',
      teachingLearningStrategiesScore: '0',
      tls1Score: '0',
      tls2Score: '0',
      tls3Score: '0',
      tls4Score: '0',
      tls5Score: '0',
      tls6Score: '0',
      tls7Score: '0',
      tls8Score: '0',
      totalScore: '0',
      studentLevel: 'Beginner',
      lessonThemes: ['Mock Lesson Theme'],
      grade: '',
      showGrade: false,
      result: 'were unsuccessful',
      feedback: 'Mock feedback',
      categoryDescriptor: 'ADI Part 3',
      RMFail: true,
      code4: false,
      isADI3: true,
      isSC: false,
      positionType: 'in',
    } as CatADI3CustomProperties);
  });

  it('should return all ADI3 data fields needed for notify template', () => {
    const td = {
      lessonPlanning: {
        q1: getQuestion(1, 2),
        q2: getQuestion(2, 2),
        q3: getQuestion(3, 3),
        q4: getQuestion(4, 1),
        score: 8,
      },
      riskManagement: {
        q1: getQuestion(1, 2),
        q2: getQuestion(2, 2),
        q3: getQuestion(3, 0),
        q4: getQuestion(4, 1),
        q5: getQuestion(4, 3),
        score:8,
      },
      teachingLearningStrategies: {
        q1: getQuestion(1, 3),
        q2: getQuestion(2, 2),
        q3: getQuestion(3, 3),
        q4: getQuestion(4, 1),
        q5: getQuestion(4, 2),
        q6: getQuestion(4, 0),
        q7: getQuestion(4, 1),
        q8: getQuestion(4, 3),
        score: 15,
      },
      review: { grade: 'A', feedback: '' },
      lessonAndTheme: {
        studentLevel: 'flhNew',
        lessonThemes: ['interactionWithOtherRoadUsers', 'dualCarriagewayFasterRoads', 'commentary'],
        other: 'Another Mock Lesson Theme',
      },
    } as CatADI3TestData;

    expect(getCustomPropertiesCatADI3(td, '1', '123', 'SC')).toEqual({
      prn: '123',
      lessonPlanningScore: '8',
      lp1Score: '2',
      lp2Score: '2',
      lp3Score: '3',
      lp4Score: '1',
      riskManagementScore: '8',
      rm1Score: '2',
      rm2Score: '2',
      rm3Score: '0',
      rm4Score: '1',
      rm5Score: '3',
      teachingLearningStrategiesScore: '15',
      tls1Score: '3',
      tls2Score: '2',
      tls3Score: '3',
      tls4Score: '1',
      tls5Score: '2',
      tls6Score: '0',
      tls7Score: '1',
      tls8Score: '3',
      totalScore: '31',
      studentLevel: 'FLH New',
      lessonThemes: [
        'Interaction with other road users',
        'Dual carriageway / faster moving roads',
        'Commentary',
        'Another Mock Lesson Theme',
      ],
      grade: 'A',
      showGrade: true,
      result: 'passed',
      feedback: '',
      categoryDescriptor: 'Standards Check',
      RMFail: false,
      code4: false,
      isADI3: false,
      isSC: true,
      positionType: 'on',
    } as CatADI3CustomProperties);
  });

  it('should return all SC data fields needed for notify template', () => {
    const td = {
      lessonPlanning: {
        q1: getQuestion(1, 2),
        q2: getQuestion(2, 2),
        q3: getQuestion(3, 3),
        q4: getQuestion(4, 1),
        score: 8,
      },
      riskManagement: {
        q1: getQuestion(1, 2),
        q2: getQuestion(2, 2),
        q3: getQuestion(3, 0),
        q4: getQuestion(4, 1),
        q5: getQuestion(4, 3),
        score:8,
      },
      teachingLearningStrategies: {
        q1: getQuestion(1, 3),
        q2: getQuestion(2, 2),
        q3: getQuestion(3, 3),
        q4: getQuestion(4, 1),
        q5: getQuestion(4, 2),
        q6: getQuestion(4, 0),
        q7: getQuestion(4, 1),
        q8: getQuestion(4, 3),
        score: 15,
      },
      review: { grade: 'A', feedback: '' },
      lessonAndTheme: {
        studentLevel: 'flhNew',
        lessonThemes: ['interactionWithOtherRoadUsers', 'dualCarriagewayFasterRoads', 'commentary'],
        other: 'Another Mock Lesson Theme',
      },
    } as CatADI3TestData;

    expect(getCustomPropertiesCatADI3(td, '1', '123', 'SC')).toEqual({
      prn: '123',
      lessonPlanningScore: '8',
      lp1Score: '2',
      lp2Score: '2',
      lp3Score: '3',
      lp4Score: '1',
      riskManagementScore: '8',
      rm1Score: '2',
      rm2Score: '2',
      rm3Score: '0',
      rm4Score: '1',
      rm5Score: '3',
      teachingLearningStrategiesScore: '15',
      tls1Score: '3',
      tls2Score: '2',
      tls3Score: '3',
      tls4Score: '1',
      tls5Score: '2',
      tls6Score: '0',
      tls7Score: '1',
      tls8Score: '3',
      totalScore: '31',
      studentLevel: 'FLH New',
      lessonThemes: [
        'Interaction with other road users',
        'Dual carriageway / faster moving roads',
        'Commentary',
        'Another Mock Lesson Theme',
      ],
      grade: 'A',
      showGrade: true,
      result: 'passed',
      feedback: '',
      categoryDescriptor: 'Standards Check',
      RMFail: false,
      code4: false,
      isADI3: false,
      isSC: true,
      positionType: 'on',
    } as CatADI3CustomProperties);
  });

  it('should throw error when undefined test data', () => {
    const td = undefined;
    expect(() => {
      getCustomPropertiesCatADI3(td, '4', '', 'ADI3');
    }).toThrowError('No Test Data');
  });
});
