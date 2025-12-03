import { Cache } from "../base";

export default class LandslideWarning extends BaseEvent {
  constructor(data) {
    super({
      id: data.id,
      timeUt: data.timeUt || data.time_ut,
    });
    this.threatLevel = data.threat_level || data.threatLevel;
  }

  static async getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/lk_dmc_landslides/refs/heads/main/data/latest_flat.json";
  }
}
