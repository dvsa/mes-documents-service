import { getTestOutcome, isFail, isPass } from '../test-outcome';
import { TestOutcome } from '../../../domain/test-outcome';

describe('Test Outcome Functions', () => {
  describe('isPass', () => {
    it('should return true for activity code 1', () => {
      expect(isPass('1')).toBe(true);
    });

    it('should return false for activity code other than 1', () => {
      expect(isPass('2')).toBe(false);
      expect(isPass('3')).toBe(false);
      // Add more cases as needed
    });
  });

  describe('isFail', () => {
    it('should return true for activity codes 2, 3, 4, 5', () => {
      expect(isFail('2')).toBe(true);
      expect(isFail('3')).toBe(true);
      expect(isFail('4')).toBe(true);
      expect(isFail('5')).toBe(true);
    });

    it('should return false for activity code other than 2, 3, 4, 5', () => {
      expect(isFail('1')).toBe(false);
    });
  });

  describe('getTestOutcome', () => {
    it('should return PASS for activity code 1', () => {
      expect(getTestOutcome('1')).toBe(TestOutcome.PASS);
    });

    it('should return FAIL for activity codes 2, 3, 4, 5', () => {
      expect(getTestOutcome('2')).toBe(TestOutcome.FAIL);
      expect(getTestOutcome('3')).toBe(TestOutcome.FAIL);
      expect(getTestOutcome('4')).toBe(TestOutcome.FAIL);
      expect(getTestOutcome('5')).toBe(TestOutcome.FAIL);
    });

  });
});
