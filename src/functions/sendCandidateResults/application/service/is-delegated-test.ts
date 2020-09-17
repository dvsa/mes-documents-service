import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { TestResultCatCPCSchema } from '@dvsa/mes-test-schema/categories/CPC';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';

function isDelegatedTest(testResult: TestResultSchemasUnion): boolean {

  if (testResult.category === 'B+E') {
    return (testResult as CatBEUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'C') {
    return (testResult as CatCUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'C+E') {
    return (testResult as CatCEUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'C1') {
    return (testResult as CatC1UniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'C1+E') {
    return (testResult as CatC1EUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'D') {
    return (testResult as CatDUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'D+E') {
    return (testResult as CatDEUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'D1') {
    return (testResult as CatD1UniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'D1+E') {
    return (testResult as CatD1EUniqueTypes.TestResult).delegatedTest === true;
  }

  if (testResult.category === 'CCPC') {
    return (testResult as TestResultCatCPCSchema).delegatedTest === true;
  }

  return false;
}

export default isDelegatedTest;
