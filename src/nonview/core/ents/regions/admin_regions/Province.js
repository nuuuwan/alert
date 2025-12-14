import AdminRegion from "./AdminRegion";
export default class Province extends AdminRegion {
  static getAdminRegionType() {
    return "province";
  }

  static getEntTypeName() {
    return "Province";
  }
  static getEntTypeNameShort() {
    return "Province";
  }
}
