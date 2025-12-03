import BaseAdminRegion from "./BaseAdminRegion";
export default class DSD extends BaseAdminRegion {
  static getAdminRegionType() {
    return "dsd";
  }

  static getEntTypeTitle() {
    return "Divisional Secretariat Division";
  }
}
