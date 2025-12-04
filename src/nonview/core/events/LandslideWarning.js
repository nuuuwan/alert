import LandslideArea from "../roles/LandslideArea.js";
import BaseEvent from "./BaseEvent.js";
import LandslideThreatLevel from "./LandslideThreatLevel.js";
import TimeUtils from "../TimeUtils.js";
export default class LandslideWarning extends BaseEvent {
  static getRoleClass() {
    return LandslideArea;
  }
  static getEventTypeName() {
    return "LandslideWarning";
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/lk_dmc_landslides/refs/heads/main/data/alert_data.json";
  }

  static rawDataToRawDataList(rawData) {
    const minTimeUt = Math.floor(Date.now() / 1000) - 2 * 24 * 3600;
    return Object.entries(rawData["event_data"]).reduce(function (
      rawDataList,
      [id, datePartToLevel]
    ) {
      return Object.entries(datePartToLevel).reduce(function (
        rawDataList,
        [datePart, level]
      ) {
        const timeUt = TimeUtils.parseYYYYMMDD(datePart);
        if (timeUt >= minTimeUt) {
          rawDataList.push({
            id: id,
            time_ut: timeUt,
            threat_level: level,
          });
        }
        return rawDataList;
      },
      rawDataList);
    },
    []);
  }

  constructor(data) {
    super({
      id: data.id,
      timeUt: data.timeUt || data.time_ut,
    });
    this.threatLevel = parseInt(data.threatLevel || data.threat_level);
  }

  get landslideThreatLevel() {
    return LandslideThreatLevel.fromLevel(this.threatLevel);
  }

  get priority() {
    return ((this.threatLevel - 1) * 100) / 3;
  }

  async getColor() {
    return this.landslideThreatLevel.colorRgb;
  }
}
