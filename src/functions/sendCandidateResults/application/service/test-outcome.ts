import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { TestOutcome } from '../../domain/test-outcome';

export function isPass(activityCode: ActivityCode): boolean {
  return activityCode === '1';
}

export function isFail(activityCode: ActivityCode): boolean {
  return activityCode === '2' || activityCode === '3' || activityCode === '4' || activityCode === '5';
}

export function getTestOutcome(activityCode: ActivityCode): TestOutcome {
  return activityCode === '1' ? TestOutcome.PASS : TestOutcome.FAIL;
}
