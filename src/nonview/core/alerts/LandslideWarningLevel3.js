import Alert from "./Alert";
import LandslideWarning from "../events/LandslideWarning";

export default class LandslideWarningLevel3 extends Alert {
  static getEventClass() {
    return LandslideWarning;
  }

  static getAlertName() {
    return "Landslide Warning Level 3";
  }

  static color() {
    return "red";
  }

  async isTrue() {
    return this.event.threatLevel === 3;
  }
}
