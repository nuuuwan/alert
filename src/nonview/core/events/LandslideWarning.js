import LandslideArea from "../roles/LandslideArea.js";
import BaseEvent from "./BaseEvent.js";

export default class LandslideWarning extends BaseEvent {
  static getRoleClass() {
    return LandslideArea;
  }
  static getEventTypeName() {
    return "LandslideWarning";
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/lk_dmc_landslides/refs/heads/main/data/latest_flat.json";
  }

  constructor(data) {
    super({
      id: data.id,
      timeUt: data.timeUt || data.time_ut,
    });
    this.threatLevel = parseInt(data.threatLevel || data.threat_level);
  }

  get priority() {
    return ((this.threatLevel - 1) * 100) / 3;
  }
}
