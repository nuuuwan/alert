import Alert from "./Alert";
import RiverWaterLevelMeasurement from "../events/RiverWaterLevelMeasurement";

export default class MajorFlood extends Alert {
  static getEventClass() {
    return RiverWaterLevelMeasurement;
  }

  static getAlertName() {
    return "Major Flood";
  }

  static color() {
    return "red";
  }

  async isTrue() {
    const gaugingStation = await this.gaugingStation();
    const majorFloodLevelM = gaugingStation.majorFloodLevelM;
    return this.event.waterLevelM >= majorFloodLevelM;
  }
}
