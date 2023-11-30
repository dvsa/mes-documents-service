import { TestData } from '@dvsa/mes-test-schema/categories/CPC';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { get, toString } from 'lodash';

import { CustomProperties } from '../../../../domain/custom-properties';

const DEFAULT_SCORE: string = '0';

interface CatCPCCustomProperties extends CustomProperties {
  q1Score: string;
  q2Score: string;
  q3Score: string;
  q4Score: string;
  q5Score: string;
  totalScore: string;
  showLGVText: boolean;
  showPCVText: boolean;
}

export const getCustomPropertiesCatCPC = (
  testData: TestData | undefined,
  category: CategoryCode): CatCPCCustomProperties => {

  if (!testData) { throw new Error('No Test Data'); }

  return {
    q1Score: toString(get(testData, 'question1.score')) || DEFAULT_SCORE,
    q2Score: toString(get(testData, 'question2.score')) || DEFAULT_SCORE,
    q3Score: toString(get(testData, 'question3.score')) || DEFAULT_SCORE,
    q4Score: toString(get(testData, 'question4.score')) || DEFAULT_SCORE,
    q5Score: toString(get(testData, 'question5.score')) || DEFAULT_SCORE,
    totalScore: toString(get(testData, 'totalPercent')) || DEFAULT_SCORE,
    showLGVText: (category === TestCategory.CCPC),
    showPCVText: (category === TestCategory.DCPC),
  };
};
