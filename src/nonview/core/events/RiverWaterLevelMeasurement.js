import BaseEvent from "./BaseEvent.js";
import GaugingStation from "../roles/GaugingStation.js";
import Place from "../ents/Place.js";
class RiverWaterLevelMeasurement extends BaseEvent {
  constructor(data) {
    super({
      id: data.id || data.station_name,
      timeUt: data.timeUt || data.time_ut,
    });
    this.waterLevelM = data.waterLevelM || data.water_level_m;
  }

  static getEventTypeName() {
    return "RiverWaterLevelMeasurement";
  }

  static getUrl() {
    // {
    //   "station_name": "Thanthirimale",
    //   "time_ut": 1764754996,
    //   "water_level_m": 7.11
    // },
    return "https://raw.githubusercontent.com/nuuuwan/lk_irrigation/refs/heads/main/data/all.json";
  }

  static async placeToLatestMeasurement() {
    const index = await this.idx();
    const latestMap = {};

    for (const stationName in index) {
      const levels = index[stationName];
      if (levels.length > 0) {
        latestMap[stationName] = levels[levels.length - 1];
      }
    }

    return latestMap;
  }

  async gaugingStation() {
    const place = await Place.fromID(this.entId);
    const gaugingStation = await GaugingStation.fromID(place.id);
    return gaugingStation;
  }

  async alert() {
    const gaugingStation = await this.gaugingStation();
    return gaugingStation.getAlert(this.waterLevelM);
  }

  get priority() {
    return 50; // FIX! Must be a function of alert
  }

  async getColor() {
    return (await this.alert()).color;
  }
}

export default RiverWaterLevelMeasurement;
