import Unit from "./Unit";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export default class Temperature extends Unit {
  static getLabel() {
    return "Temperature";
  }
  static getUnitLabel() {
    return "°C";
  }
  static getIcon() {
    return DeviceThermostatIcon;
  }
  static getColor() {
    return "rgb(255, 87, 34)";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
