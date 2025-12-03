import BaseEvent from "./BaseEvent.js";
import WeatherStationPlaceRole from "../roles/WeatherStationPlaceRole.js";
import DataWithIDMixin from "../../base/DataWithIDMixin.js";
import DataWithTimeMixin from "../../base/DataWithTimeMixin.js";

class WeatherReport extends BaseEvent {
  static getRoleClass() {
    return WeatherStationPlaceRole;
  }

  constructor(data) {
    super({ id: data.id, timeUt: data.timeUt || data.time_ut });
    this.rainMM = data.rainMM || data.rain_MM;
    this.tempMinC = data.tempMinC || data.temp_min_c;
    this.tempMaxC = data.tempMaxC || data.temp_max_c;
  }

  static getUrl() {
    return "https://raw.githubusercontent.com/nuuuwan/weather_lk/refs/heads/data/latest_flat.json";
  }
}

Object.assign(WeatherReport.prototype, DataWithIDMixin);
Object.assign(WeatherReport, DataWithTimeMixin);

export default WeatherReport;
