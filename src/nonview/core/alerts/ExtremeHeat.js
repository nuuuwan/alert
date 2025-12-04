import Alert from "./Alert";
import WeatherReport from "../events/WeatherReport";

export default class ExtremeHeat extends Alert {
  static getEventClass() {
    return WeatherReport;
  }

  static getAlertName() {
    return "Extreme Heat";
  }

  static getColor() {
    return "red";
  }

  isTrue() {
    return this.event.tempMaxC > 35;
  }
}
