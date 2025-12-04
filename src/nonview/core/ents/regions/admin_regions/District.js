import AdminRegion from "../AdminRegion";
export default class District extends AdminRegion {
  static getAdminRegionType() {
    return "district";
  }
}
