import Alert from "./Alert";
import RiverWaterLevelMeasurement from "../events/RiverWaterLevelMeasurement";

export default class MajorFlood extends Alert {
  static getEventClass() {
    return RiverWaterLevelMeasurement;
  }

  static getAlertName() {
    return "Major Flood";
  }

  static getColor() {
    return "red";
  }

  isTrue() {
    const gaugingStation = this.role;
    const majorFloodLevelM = gaugingStation.majorFloodLevelM;
    return this.event.waterLevelM >= majorFloodLevelM;
  }
}
