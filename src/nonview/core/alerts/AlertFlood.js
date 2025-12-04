import Alert from "./Alert";
import RiverWaterLevelMeasurement from "../events/RiverWaterLevelMeasurement";

export default class AlertFlood extends Alert {
  static getEventClass() {
    return RiverWaterLevelMeasurement;
  }

  static getAlertName() {
    return "Alert Flood";
  }

  static color() {
    return "yellow";
  }

  async isTrue() {
    const gaugingStation = await this.gaugingStation();
    const alertLevelM = gaugingStation.alertLevelM;
    return (
      this.event.waterLevelM >= alertLevelM &&
      this.event.waterLevelM < gaugingStation.minorFloodLevelM
    );
  }
}
