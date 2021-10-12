import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

function isManoeuvreTest(category: TestCategory) {
  return category === TestCategory.CM
    || category === TestCategory.C1M
    || category === TestCategory.CEM
    || category === TestCategory.C1EM
    || category === TestCategory.DM
    || category === TestCategory.D1M
    || category === TestCategory.DEM
    || category === TestCategory.D1EM;
}

export default isManoeuvreTest;
