import BaseEvent from "./BaseEvent";
import WeatherStation from "../roles/WeatherStation";
import DataWithTimeMixin from "../../base/mixins/DataWithTimeMixin";

class WeatherReport extends BaseEvent {
  static getRoleClass() {
    return WeatherStation;
  }

  static getEventTypeName() {
    return "WeatherReport";
  }

  constructor(data) {
    super({ id: data.id, timeUt: data.timeUt || data.time_ut });
    this.rainMM = data.rainMM || data.rain_mm;
    this.tempMinC = data.tempMinC || data.temp_min_c;
    this.tempMaxC = data.tempMaxC || data.temp_max_c;
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/weather_lk/refs/heads/data/latest_flat.json";
  }
}

Object.assign(WeatherReport.prototype, DataWithTimeMixin);

export default WeatherReport;
