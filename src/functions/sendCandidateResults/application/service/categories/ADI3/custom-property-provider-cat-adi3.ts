import { LessonTheme, StudentLevel, TestData } from '@dvsa/mes-test-schema/categories/ADI3';
import { get, toString } from 'lodash';

import { CustomProperties } from '../../../../domain/custom-properties';
import { lessonThemeValues, studentValues } from '../../../../domain/competencies';
import { BooleanText } from '../../../../domain/personalisation.model';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';

const DEFAULT_SCORE: string = '0';

export interface CatADI3CustomProperties extends CustomProperties {
  lessonPlanningScore: string;
  lp1Score: string;
  lp2Score: string;
  lp3Score: string;
  lp4Score: string;
  riskManagementScore: string;
  rm1Score: string;
  rm2Score: string;
  rm3Score: string;
  rm4Score: string;
  rm5Score: string;
  teachingLearningStrategiesScore: string;
  tls1Score: string;
  tls2Score: string;
  tls3Score: string;
  tls4Score: string;
  tls5Score: string;
  tls6Score: string;
  tls7Score: string;
  tls8Score: string;
  totalScore: string;
  studentLevel: string;
  lessonThemes: string[];
  grade: string;
  showGrade: BooleanText;
  result: string;
  feedback: string;
  prn: string;
}

export const getCustomPropertiesCatADI3 = (
  testData: TestData | undefined,
  activityCode: ActivityCode,
  prn: string,
): CatADI3CustomProperties => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  const grade = toString(get(testData, 'review.grade'));

  return {
    lessonPlanningScore: toString(get(testData, 'lessonPlanning.score')) || DEFAULT_SCORE,
    lp1Score: toString(get(testData, 'lessonPlanning.q1.score')) || DEFAULT_SCORE,
    lp2Score: toString(get(testData, 'lessonPlanning.q2.score')) || DEFAULT_SCORE,
    lp3Score: toString(get(testData, 'lessonPlanning.q3.score')) || DEFAULT_SCORE,
    lp4Score: toString(get(testData, 'lessonPlanning.q4.score')) || DEFAULT_SCORE,
    riskManagementScore: toString(get(testData, 'riskManagement.score')) || DEFAULT_SCORE,
    rm1Score: toString(get(testData, 'riskManagement.q1.score')) || DEFAULT_SCORE,
    rm2Score: toString(get(testData, 'riskManagement.q2.score')) || DEFAULT_SCORE,
    rm3Score: toString(get(testData, 'riskManagement.q3.score')) || DEFAULT_SCORE,
    rm4Score: toString(get(testData, 'riskManagement.q4.score')) || DEFAULT_SCORE,
    rm5Score: toString(get(testData, 'riskManagement.q5.score')) || DEFAULT_SCORE,
    teachingLearningStrategiesScore: toString(get(testData, 'teachingLearningStrategies.score')) || DEFAULT_SCORE,
    tls1Score: toString(get(testData, 'teachingLearningStrategies.q1.score')) || DEFAULT_SCORE,
    tls2Score: toString(get(testData, 'teachingLearningStrategies.q2.score')) || DEFAULT_SCORE,
    tls3Score: toString(get(testData, 'teachingLearningStrategies.q3.score')) || DEFAULT_SCORE,
    tls4Score: toString(get(testData, 'teachingLearningStrategies.q4.score')) || DEFAULT_SCORE,
    tls5Score: toString(get(testData, 'teachingLearningStrategies.q5.score')) || DEFAULT_SCORE,
    tls6Score: toString(get(testData, 'teachingLearningStrategies.q6.score')) || DEFAULT_SCORE,
    tls7Score: toString(get(testData, 'teachingLearningStrategies.q7.score')) || DEFAULT_SCORE,
    tls8Score: toString(get(testData, 'teachingLearningStrategies.q8.score')) || DEFAULT_SCORE,
    totalScore: toString(get(testData, 'lessonPlanning.score') +
      get(testData, 'riskManagement.score') +
      get(testData, 'teachingLearningStrategies.score')) || DEFAULT_SCORE,
    studentLevel: studentValues[testData?.lessonAndTheme?.studentLevel as StudentLevel],
    lessonThemes: testData?.lessonAndTheme?.lessonThemes
      ?.map((theme) => lessonThemeValues[theme])
      .concat(get(testData, 'lessonAndTheme.other', null))
      .filter((theme) => !!theme) as LessonTheme[],
    grade: (activityCode === '1' && grade) ? grade : '',
    showGrade: (activityCode === '1' && get(testData, 'review.grade')) ? BooleanText.YES : BooleanText.NO,
    result: (activityCode === '1') ? 'PASSED' : 'were UNSUCCESSFUL',
    feedback: get(testData, 'review.feedback'),
    prn,
  };
};
