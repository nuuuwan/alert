import Alert from "./Alert";
import RiverWaterLevelMeasurement from "../events/RiverWaterLevelMeasurement";

export default class AlertFlood extends Alert {
  static getEventClass() {
    return RiverWaterLevelMeasurement;
  }

  static getAlertName() {
    return "Alert Flood";
  }

  static getColor() {
    return "yellow";
  }

  isTrue() {
    const gaugingStation = this.role;
    const alertLevelM = gaugingStation.alertLevelM;
    return (
      this.event.waterLevelM >= alertLevelM &&
      this.event.waterLevelM < gaugingStation.minorFloodLevelM
    );
  }
}
