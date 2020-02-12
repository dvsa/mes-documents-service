import { Competencies } from './competencies';

export interface Fault {
  name: Competencies;
  count: number;
}

export enum FaultLimit {
  TRAILER = 2,
  NON_TRAILER = 5,
}
