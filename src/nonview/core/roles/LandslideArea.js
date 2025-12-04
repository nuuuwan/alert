import Role from "./Role";
import DSD from "../ents/regions/admin_regions/DSD";
export default class LandslideArea extends Role {
  static getEntClass() {
    return DSD;
  }

  static getRoleTypeName() {
    return "LandslideArea";
  }
}
