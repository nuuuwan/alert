import AdminRegion from "./AdminRegion";
export default class DSD extends AdminRegion {
  static getAdminRegionType() {
    return "dsd";
  }

  static getEntTypeTitle() {
    return "Divisional Secretariat Division";
  }
}
