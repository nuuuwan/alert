import Alert from "./Alert";
import WeatherReport from "../events/WeatherReport";

export default class HeavyRain extends Alert {
  static getEventClass() {
    return WeatherReport;
  }

  static getAlertName() {
    return "Heavy Rain";
  }

  static color() {
    return "blue";
  }

  async isTrue() {
    return this.event.rainMM >= 50 && this.event.rainMM < 100;
  }
}
