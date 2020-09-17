import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import isDelegatedTest from '../is-delegated-test';
import testResultUnionMock from '../__mocks__/test-result-union.mock';

describe('is-delegated-test', () => {
  it('should return false when test category can not be a delegated test', () => {
    const testResult: CatBUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatBUniqueTypes.TestResult),
      category: 'B',
    };

    const result = isDelegatedTest(testResult);

    expect(result).toBe(false);
  });

  describe('examine category B+E test result', () => {
    const testResult: CatBEUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatBEUniqueTypes.TestResult),
      category: 'B+E',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category C test result', () => {
    const testResult: CatCUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatCUniqueTypes.TestResult),
      category: 'C',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category C+E test result', () => {
    const testResult: CatCEUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatCEUniqueTypes.TestResult),
      category: 'C+E',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category C1 test result', () => {
    const testResult: CatC1UniqueTypes.TestResult = {
      ...(testResultUnionMock as CatC1UniqueTypes.TestResult),
      category: 'C1',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category C1+E test result', () => {
    const testResult: CatC1EUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatC1EUniqueTypes.TestResult),
      category: 'C1+E',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category D test result', () => {
    const testResult: CatDUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatDUniqueTypes.TestResult),
      category: 'D',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category D+E test result', () => {
    const testResult: CatDEUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatDEUniqueTypes.TestResult),
      category: 'D+E',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category D1 test result', () => {
    const testResult: CatD1UniqueTypes.TestResult = {
      ...(testResultUnionMock as CatD1UniqueTypes.TestResult),
      category: 'D1',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

  describe('examine category D1+E test result', () => {
    const testResult: CatD1EUniqueTypes.TestResult = {
      ...(testResultUnionMock as CatD1EUniqueTypes.TestResult),
      category: 'D1+E',
    };

    it('should return true if delegatedTest is true', () => {
      testResult.delegatedTest = true;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(true);
    });

    it('should return false if delegatedTest is false', () => {
      testResult.delegatedTest = false;

      const result = isDelegatedTest(testResult);

      expect(result).toBe(false);
    });
  });

});
