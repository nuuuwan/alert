import BaseEvent from "./BaseEvent";
import WeatherStation from "../roles/WeatherStation";
import DataWithTimeMixin from "../../base/mixins/DataWithTimeMixin";
import TimeUtils from "../TimeUtils";

class WeatherReport extends BaseEvent {
  static getRoleClass() {
    return WeatherStation;
  }

  static getEventTypeName() {
    return "WeatherReport";
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/weather_lk/refs/heads/data/alert_data.json";
  }

  static rawDataToRawDataList(rawData) {
    const minTimeUt = Math.floor(Date.now() / 1000) - 1 * 24 * 3600;
    return Object.entries(rawData["event_data"]).reduce(function (
      rawDataList,
      [id, datePartToMeasurementMap],
    ) {
      return Object.entries(datePartToMeasurementMap).reduce(function (
        rawDataList,
        [datePart, measurementMap],
      ) {
        const timeUt = TimeUtils.parseYYYYMMDD(datePart);

        if (timeUt >= minTimeUt) {
          rawDataList.push({
            id: id,
            time_ut: timeUt,
            rain_mm: measurementMap["rain_mm"],
            temp_min_c: measurementMap["temp_min_c"],
            temp_max_c: measurementMap["temp_max_c"],
          });
        }
        return rawDataList;
      }, rawDataList);
    }, []);
  }

  constructor(data) {
    super({ id: data.id, timeUt: data.timeUt || data.time_ut });
    this.rainMM = data.rainMM || data.rain_mm;
    this.tempMinC = data.tempMinC || data.temp_min_c;
    this.tempMaxC = data.tempMaxC || data.temp_max_c;
  }

  get priority() {
    return 0; // FUTURE: Could be higher for heavy rain etc
  }

  async getColor() {
    if (this.tempMaxC >= 35) {
      return "red";
    }
    if (this.rainMM >= 200) {
      return "violet";
    }
    if (this.rainMM >= 100) {
      return "darkblue";
    }
    if (this.rainMM > 0) {
      return "blue";
    }
    return "grey";
  }
}

Object.assign(WeatherReport.prototype, DataWithTimeMixin);

export default WeatherReport;
