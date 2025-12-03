import BaseAdminRegion from "../BaseAdminRegion";
export default class Province extends BaseAdminRegion {
  static getAdminRegionType() {
    return "province";
  }
}
