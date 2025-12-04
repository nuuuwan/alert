import Alert from "./Alert";
import LandslideWarning from "../events/LandslideWarning";

export default class LandslideWarningLevel2 extends Alert {
  static getEventClass() {
    return LandslideWarning;
  }

  static getAlertName() {
    return "Landslide Warning Level 2";
  }

  static color() {
    return "orange";
  }

  async isTrue() {
    return this.event.threatLevel === 2;
  }
}
