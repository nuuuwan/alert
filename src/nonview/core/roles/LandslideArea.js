import BaseRole from "./BaseRole";
import DSD from "../ents/regions/admin_regions/DSD";
export default class LandslideArea extends BaseRole {
  static getEntClass() {
    return DSD;
  }
}
