import { COLORS } from "../../../view/_cons/StyleConstants";
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
    return COLORS.fire;
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
