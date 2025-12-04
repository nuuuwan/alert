import Alert from "./Alert";
import RiverWaterLevelMeasurement from "../events/RiverWaterLevelMeasurement";

export default class MinorFlood extends Alert {
  static getEventClass() {
    return RiverWaterLevelMeasurement;
  }

  static getAlertName() {
    return "Minor Flood";
  }

  static color() {
    return "orange";
  }

  isTrue() {
    const gaugingStation = this.role;
    const minorFloodLevelM = gaugingStation.minorFloodLevelM;
    return (
      this.event.waterLevelM >= minorFloodLevelM &&
      this.event.waterLevelM < gaugingStation.majorFloodLevelM
    );
  }
}
