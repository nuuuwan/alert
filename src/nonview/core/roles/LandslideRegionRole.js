import BaseRole from "./BaseRole";
import DSD from "../ents/regions/admin_regions/DSD";
export default class LandslideRegionRole extends BaseRole {
  static getEntClass() {
    return DSD;
  }
}
