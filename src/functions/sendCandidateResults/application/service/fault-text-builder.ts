import { TestData, ManoeuvreOutcome, VehicleChecks, QuestionOutcome } from '@dvsa/mes-test-schema/categories/B';

export interface Fault {
  name: string;
  count: number;
}

export class FaultTextBuilder {

  public getDrivingFaults(testData: TestData | undefined): Fault [] {
    const drivingFaults: Fault[] = [];

    if (!testData) {
      throw new Error('No Test Data');
    }

    if (testData.drivingFaults) {
      this.convertNumericFaultObjectToArray(testData.drivingFaults)
        .forEach(fault => drivingFaults.push(fault));
    }

    this.getNonStandardFaults(testData, 'DF')
      .forEach(fault => drivingFaults.push(fault));

    console.log('DRIVING', drivingFaults);

    return drivingFaults;
  }

  public getSeriousFaults(testData: TestData | undefined): Fault [] {
    const seriousFaults: Fault[] = [];

    if (!testData) {
      throw new Error('No Test Data');
    }

    if (testData.seriousFaults) {
      this.convertBooleanFaultObjectToArray(testData.seriousFaults)
        .forEach(fault => seriousFaults.push(fault));
    }

    this.getNonStandardFaults(testData, 'S')
      .forEach(fault => seriousFaults.push(fault));

    console.log('SERIOUS', seriousFaults);

    return seriousFaults;
  }

  public getDangerousFaults(testData: TestData | undefined): Fault [] {
    const dangerousFaults: Fault[] = [];

    if (!testData) {
      throw new Error('No Test Data');
    }

    if (testData.dangerousFaults) {
      this.convertBooleanFaultObjectToArray(testData.dangerousFaults)
        .forEach(fault => dangerousFaults.push(fault));
    }

    this.getNonStandardFaults(testData, 'D')
      .forEach(fault => dangerousFaults.push(fault));

    console.log('DANGEROUS', dangerousFaults);

    return dangerousFaults;
  }

  protected convertNumericFaultObjectToArray(faults: any): Fault[] {
    return Object.keys(faults)
    .filter(key => !key.toLowerCase().endsWith('comments'))
    .map((key) => { return { name: key , count: faults[key] } as Fault; })
    .filter(fault => fault.count > 0);
  }

  protected convertBooleanFaultObjectToArray(faults: any): Fault[] {
    return Object.keys(faults)
    .filter(key => !key.toLowerCase().endsWith('comments'))
    .filter(key => faults[key])
    .map((key) => { return { name: key , count: 1 } as Fault; });
  }

  protected getNonStandardFaults(testData: TestData, faultType: 'DF' | 'S' | 'D') : Fault[] {
    const faults: Fault[] = [];

  // Controlled Stop
    if (
    testData.controlledStop &&
    testData.controlledStop.selected &&
    testData.controlledStop.fault === faultType) {
      faults.push({ name: 'controlledStop', count: 1 });
    }

  // Manoeuvres
    if (testData.manoeuvres) {
      this.getCompletedManoeuvres(testData.manoeuvres, faultType)
    .forEach(fault => faults.push(fault));
    }

  // Vehicle Checks
    if (testData.vehicleChecks) {
      this.getVehicleChecksFault(testData.vehicleChecks, faultType)
      .forEach(fault => faults.push(fault));
    }

    return faults;
  }

  protected getCompletedManoeuvres(manoeuvres : any, faultType: ManoeuvreOutcome) : Fault[] {
    const result: Fault[] = [];

    Object.keys(manoeuvres).forEach((manoeuvreName) => {
      if (manoeuvres[manoeuvreName].selected === true) {
        if (manoeuvres[manoeuvreName].controlFault && manoeuvres[manoeuvreName].controlFault === faultType) {
          result.push({ name: `${manoeuvreName}ControlFault`, count: 1 });
        }
        if (manoeuvres[manoeuvreName].observationFault && manoeuvres[manoeuvreName].observationFault === faultType) {
          result.push({ name: `${manoeuvreName}ObservationFault`, count: 1 });
        }
      }
    });

    return result;
  }

  protected getVehicleChecksFault(vehicleChecks: VehicleChecks, faultType: QuestionOutcome) : Fault[] {
    if (faultType === 'D') {
      if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === 'D') {
        return [{ name:  'vehicleChecks', count: 1 }];
      }
    }

    if (faultType === 'S') {
      if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === 'S') {
        return [{ name:  'vehicleChecks', count: 1 }];
      }
    }

    if (faultType === 'DF') {
      if (
        vehicleChecks.showMeQuestion &&
        (vehicleChecks.showMeQuestion.outcome === 'S' || vehicleChecks.showMeQuestion.outcome === 'D')
      ) {
        return [];
      }

      if (vehicleChecks.showMeQuestion && vehicleChecks.showMeQuestion.outcome === 'DF') {
        return [{ name:  'vehicleChecks', count: 1 }];
      }

      if (vehicleChecks.tellMeQuestion && vehicleChecks.tellMeQuestion.outcome === 'DF') {
        return [{ name:  'vehicleChecks', count: 1 }];
      }
    }
    return [];
  }

}
