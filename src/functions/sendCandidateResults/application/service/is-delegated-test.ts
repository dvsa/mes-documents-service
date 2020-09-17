import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';
import { TestResultCommonSchema } from '@dvsa/mes-test-schema/categories/common';
import { TestResultCatCPCSchema } from '@dvsa/mes-test-schema/categories/CPC';

function isDelegatedTest(testResult: TestResultSchemasUnion): boolean {

  if (testResult.category === 'B+E'
    || testResult.category === 'C'
    || testResult.category === 'C+E'
    || testResult.category === 'C1'
    || testResult.category === 'C1+E'
    || testResult.category === 'D'
    || testResult.category === 'D+E'
    || testResult.category === 'D1'
    || testResult.category === 'D1+E') {
    return (testResult as TestResultCommonSchema).delegatedTest === true;
  }

  if (testResult.category === 'CCPC'
    || testResult.category === 'DCPC') {
    return (testResult as TestResultCatCPCSchema).delegatedTest === true;
  }

  return false;
}

export default isDelegatedTest;
