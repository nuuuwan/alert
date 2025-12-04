import BaseEvent from "./BaseEvent.js";
import GaugingStation from "../roles/GaugingStation.js";
import Place from "../ents/Place.js";
import TimeUtils from "../TimeUtils.js";
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
    return "https://raw.githubusercontent.com/nuuuwan/lk_irrigation/refs/heads/main/data/alert_data.json";
  }

  static rawDataToRawDataList(rawData) {
    const minTimeUt = Math.floor(Date.now() / 1000) - 7 * 24 * 3600;
    return Object.entries(rawData["event_data"]).reduce(function (
      rawDataList,
      [id, datePartToTimePartToWaterLevel],
    ) {
      return Object.entries(datePartToTimePartToWaterLevel).reduce(function (
        rawDataList,
        [datePart, timePartToWaterLevel],
      ) {
        return Object.entries(timePartToWaterLevel).reduce(function (
          rawDataList,
          [timePart, waterLevel],
        ) {
          const timeUt = TimeUtils.parseYYYYMMDDHHHMMSS(datePart + timePart);

          if (timeUt >= minTimeUt) {
            rawDataList.push({
              id: id,
              time_ut: timeUt,
              water_level_m: waterLevel,
            });
          }
          return rawDataList;
        }, rawDataList);
      }, rawDataList);
    }, []);
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
    const place = await Place.fromID(this.id);
    if (!place) {
      throw new Error(`No Place found for id: ${this.id}`);
    }
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
    return (await this.alert()).colorRgb;
  }
}

export default RiverWaterLevelMeasurement;
