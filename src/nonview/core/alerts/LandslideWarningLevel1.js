import Alert from "./Alert";
import LandslideWarning from "../events/LandslideWarning";

export default class LandslideWarningLevel1 extends Alert {
  static getEventClass() {
    return LandslideWarning;
  }

  static getAlertName() {
    return "Landslide Warning Level 1";
  }

  static color() {
    return "yellow";
  }

  async isTrue() {
    return this.event.threatLevel === 1;
  }
}
