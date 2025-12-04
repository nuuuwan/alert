import Alert from "./Alert";
import WeatherReport from "../events/WeatherReport";

export default class ExtremeRain extends Alert {
  static getEventClass() {
    return WeatherReport;
  }

  static getAlertName() {
    return "Extreme Rain";
  }

  static color() {
    return "purple";
  }

  async isTrue() {
    return this.event.rainMM >= 200;
  }
}
