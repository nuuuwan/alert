import Unit from "./Unit";
import WaterIcon from "@mui/icons-material/Water";

export default class WaterLevel extends Unit {
  static getLabel() {
    return "Water Level";
  }
  static getUnitLabel() {
    return "m";
  }
  static getIcon() {
    return WaterIcon;
  }
  static getColor() {
    return "rgb(0, 150, 255)";
  }

  format() {
    return `${this.value.toFixed(2)}`;
  }
}
