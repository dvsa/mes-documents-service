import {
  TestData as CatAMod1TestData,
  EmergencyStop,
  Avoidance,
  ConductedLanguage,
} from '@dvsa/mes-test-schema/categories/AM1';
import { CustomProperties } from '../../../../domain/custom-properties';
import { get } from 'lodash';
import { Language } from '../../../../domain/template-id.model';
import { welshTexts, englishTexts } from '../../../../domain/competencies';

export interface CatAMod1ICustomProperties extends CustomProperties {
  showEmergencyStop: boolean;
  showEmergencyFirstAttempt: boolean;
  emergencyFirstAttempt: string;
  showEmergencySecondAttempt: boolean;
  emergencySecondAttempt: string;
  showAvoidanceExercise: boolean;
  showAvoidanceFirstAttempt: boolean;
  avoidanceFirstAttempt: string;
  showAvoidanceSecondAttempt: boolean;
  avoidanceSecondAttempt: string;
}

export const getCustomPropertiesCatAMod1 = (
  testData: CatAMod1TestData | undefined,
  language: ConductedLanguage,
): CatAMod1ICustomProperties => {
  if (!testData) {
    throw new Error('No Test Data');
  }

  return {
    ...getEmergencyStopAttempts(testData.emergencyStop, language),
    ...getAvoidanceAttempts(testData.avoidance, language),
  };
};

const getEmergencyStopAttempts = (
  emergencyStopData: EmergencyStop | undefined,
  language: ConductedLanguage,
): Pick<
CatAMod1ICustomProperties,
| 'showEmergencyStop'
| 'showEmergencyFirstAttempt'
| 'emergencyFirstAttempt'
| 'showEmergencySecondAttempt'
| 'emergencySecondAttempt'
> => {
  const emergencyStopAttempts = {
    showEmergencyStop: false,
    showEmergencyFirstAttempt: false,
    emergencyFirstAttempt: '',
    showEmergencySecondAttempt: false,
    emergencySecondAttempt: '',
  };

  if (!emergencyStopData) {
    return emergencyStopAttempts;
  }

  if (get(emergencyStopData, 'firstAttempt') !== undefined) {
    emergencyStopAttempts.showEmergencyStop = true;
    emergencyStopAttempts.showEmergencyFirstAttempt = true;
    emergencyStopAttempts.emergencyFirstAttempt = getFirstAttemptText(emergencyStopData.firstAttempt, language);
  }

  if (get(emergencyStopData, 'secondAttempt') !== undefined) {
    emergencyStopAttempts.showEmergencySecondAttempt =     emergencyStopAttempts.showEmergencyFirstAttempt = true;
    emergencyStopAttempts.emergencySecondAttempt = `${emergencyStopData.secondAttempt} km/h`;
  }

  return emergencyStopAttempts;
};

const getAvoidanceAttempts = (
  avoidanceData: Avoidance | undefined,
  language: ConductedLanguage,
): Pick<
CatAMod1ICustomProperties,
| 'showAvoidanceExercise'
| 'showAvoidanceFirstAttempt'
| 'avoidanceFirstAttempt'
| 'showAvoidanceSecondAttempt'
| 'avoidanceSecondAttempt'
> => {
  const avoidanceAttempts = {
    showAvoidanceExercise: false,
    showAvoidanceFirstAttempt: false,
    avoidanceFirstAttempt: '',
    showAvoidanceSecondAttempt: false,
    avoidanceSecondAttempt: '',
  };

  if (!avoidanceData) {
    return avoidanceAttempts;
  }

  if (get(avoidanceData, 'firstAttempt') !== undefined) {
    avoidanceAttempts.showAvoidanceExercise = true;
    avoidanceAttempts.showAvoidanceFirstAttempt = true;
    avoidanceAttempts.avoidanceFirstAttempt = getFirstAttemptText(avoidanceData.firstAttempt, language);
  }

  if (get(avoidanceData, 'secondAttempt') !== undefined) {
    avoidanceAttempts.showAvoidanceSecondAttempt = true;
    avoidanceAttempts.avoidanceSecondAttempt = `${avoidanceData.secondAttempt} km/h`;
  }

  return avoidanceAttempts;
};

export const getFirstAttemptText = (firstAttempt: number | undefined, language: ConductedLanguage) => {
  if (firstAttempt === undefined) {
    return '';
  }

  if (firstAttempt === 0) {
    return language === Language.WELSH ? welshTexts.abortedAttempt : englishTexts.abortedAttempt;
  }

  return `${firstAttempt} km/h`;
};
