import BaseAdminRegion from "../BaseAdminRegion";
export default class District extends BaseAdminRegion {
  static getAdminRegionType() {
    return "district";
  }
}
