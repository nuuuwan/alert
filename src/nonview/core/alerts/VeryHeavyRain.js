import Alert from "./Alert";
import WeatherReport from "../events/WeatherReport";

export default class VeryHeavyRain extends Alert {
  static getEventClass() {
    return WeatherReport;
  }

  static getAlertName() {
    return "Very Heavy Rain";
  }

  static getColor() {
    return "darkblue";
  }

  async isTrue() {
    return this.event.rainMM >= 100 && this.event.rainMM < 200;
  }
}
