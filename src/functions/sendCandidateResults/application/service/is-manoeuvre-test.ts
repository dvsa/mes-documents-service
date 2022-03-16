import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const isDES3ManoeuvreTest = (category: TestCategory, appVersion: string | undefined) => {
  const isManoeuvreCat: boolean = (
    category === TestCategory.CM
    || category === TestCategory.C1M
    || category === TestCategory.CEM
    || category === TestCategory.C1EM
    || category === TestCategory.DM
    || category === TestCategory.D1M
    || category === TestCategory.DEM
    || category === TestCategory.D1EM
  );

  // if a manoeuvre cat, and either doesn't have an app version
  return isManoeuvreCat && (!appVersion || appVersion.startsWith('3'));
};
