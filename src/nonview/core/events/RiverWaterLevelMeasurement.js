import BaseEvent from "./BaseEvent.js";
import GaugingStationPlaceRole from "../roles/GaugingStationPlaceRole.js";
import Place from "../ents/Place.js";
class RiverWaterLevelMeasurement extends BaseEvent {
  constructor(data) {
    super({
      id: data.stationName || data.station_name,
      timeUt: data.timeUt || data.time_ut,
    });
    this.waterLevelM = data.waterLevelM || data.water_level_m;
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/lk_water_level/refs/heads/main/data/latest.json";
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
    const gaugingStation = await GaugingStationPlaceRole.fromID(place.id);
    return gaugingStation;
  }

  async alert() {
    const gaugingStation = await this.gaugingStation();
    return gaugingStation.getAlert(this.waterLevelM);
  }
}

export default RiverWaterLevelMeasurement;
