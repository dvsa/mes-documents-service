import { getManoeuvresFaultsCatADI2 } from '../fault-provider-cat-adi-pt2';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import Manoeuvres = CatADI2UniqueTypes.Manoeuvres;
import { CompetencyOutcome } from '../../../../../domain/competency-outcome';

describe('getManoeuvresFaultsCatADI2', () => {
  it('', () => {
    const manoeuvres: Manoeuvres[] = [
      {
        reverseRight: {
          selected: true,
          controlFault: 'DF',
          observationFault: 'S',
        },
      },
      {
        reverseParkRoad: {
          selected: true,
          controlFault: 'DF',
          observationFault: 'D',
        },
      },
    ];
    const drivingFaults: any = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.DF);
    const seriousFaults: any = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.S);
    const dangerousFaults: any = getManoeuvresFaultsCatADI2(manoeuvres, CompetencyOutcome.D);

    console.log(drivingFaults);
    console.log(seriousFaults);
    console.log(dangerousFaults);
  });
});
