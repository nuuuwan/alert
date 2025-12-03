import { Cache } from "../../base/index.js";
import LandslideRegionRole from "../roles/LandslideRegionRole.js";
import BaseEvent from "./BaseEvent.js";

export default class LandslideWarning extends BaseEvent {
  static getRoleClass() {
    return LandslideRegionRole;
  }
  constructor(data) {
    super({
      id: data.id,
      timeUt: data.timeUt || data.time_ut,
    });
    this.threatLevel = data.threatLevel || data.threat_level;
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/lk_dmc_landslides/refs/heads/main/data/latest_flat.json";
  }
}
