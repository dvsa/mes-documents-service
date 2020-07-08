import {
  CombinationCodes,
  Question,
  Question5,
  TestData as CatCPCTestData,
} from '@dvsa/mes-test-schema/categories/CPC';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { getCustomPropertiesCatCPC } from '../custom-property-provider-cat-cpc';
import { BooleanText } from '../../../../../domain/personalisation.model';

const getQuestion = (questionNumber: number, score: number | null): Question => {
  return {
    score: score as number,
    questionCode: `Q${questionNumber}`,
    title: 'Title of Q${questionNumber}',
    subtitle: `Subtitle of Q${questionNumber}`,
    additionalItems: [],
    answer1: {
      selected: true,
      label: 'some label',
    },
    answer2: {
      selected: true,
      label: 'some label',
    },
    answer3: {
      selected: true,
      label: 'some label',
    },
    answer4: {
      selected: false,
      label: 'some label',
    },
  };
};

const qetQuestion5 = (score: number | null): Question5 => {
  return {
    ...getQuestion(5, score),
    answer5: {
      selected: true,
      label: 'some label',
    },
    answer6: {
      selected: true,
      label: 'some label',
    },
    answer7: {
      selected: true,
      label: 'some label',
    },
    answer8: {
      selected: false,
      label: 'some label',
    },
    answer9: {
      selected: true,
      label: 'some label',
    },
    answer10: {
      selected: false,
      label: 'some label',
    },
  };
};

describe('Custom-property-provider-cat-cpc', () => {
  it('should use default values of 0 for the scores when not set', () => {
    const td: CatCPCTestData = {
      question1: getQuestion(1, null),
      question2: getQuestion(2, null),
      question3: getQuestion(3, null),
      question4: getQuestion(4, null),
      question5: qetQuestion5(null),
      totalPercent: null as any,
      combination: 'LGV1' as CombinationCodes,
    };

    expect(getCustomPropertiesCatCPC(td, TestCategory.CCPC)).toEqual({
      q1Score: '0',
      q2Score: '0',
      q3Score: '0',
      q4Score: '0',
      q5Score: '0',
      totalScore: '0',
      showLGVText: 'yes' as BooleanText,
      showPCVText: 'no' as BooleanText,
    });
  });

  it('should return all CPC data fields needed for notify template', () => {
    const td: CatCPCTestData = {
      question1: getQuestion(1, 15),
      question2: getQuestion(2, 15),
      question3: getQuestion(3, 10),
      question4: getQuestion(4, 20),
      question5: qetQuestion5(15),
      totalPercent: 80,
      combination: 'LGV1' as CombinationCodes,
    };
    expect(getCustomPropertiesCatCPC(td, TestCategory.CCPC)).toEqual({
      q1Score: '15',
      q2Score: '15',
      q3Score: '10',
      q4Score: '20',
      q5Score: '15',
      totalScore: '80',
      showLGVText: 'yes' as BooleanText,
      showPCVText: 'no' as BooleanText,
    });
  });

  it('should return all default values when test data obj is defined but is missing data', () => {
    expect(getCustomPropertiesCatCPC({} as any, TestCategory.CCPC)).toEqual({
      q1Score: '0',
      q2Score: '0',
      q3Score: '0',
      q4Score: '0',
      q5Score: '0',
      totalScore: '0',
      showLGVText: 'yes' as BooleanText,
      showPCVText: 'no' as BooleanText,
    });
  });

  it('should throw error when undefined test data', () => {
    const td = undefined;
    expect(() => {
      getCustomPropertiesCatCPC(td, TestCategory.CCPC);
    }).toThrowError('No Test Data');
  });
});
