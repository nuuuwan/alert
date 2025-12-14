import Unit from "./Unit";
import CloudRainIcon from "@mui/icons-material/CloudRain";

export default class Rain extends Unit {
  static getLabel() {
    return "Rain";
  }
  static getUnitLabel() {
    return "mm";
  }
  static getIcon() {
    return CloudRainIcon;
  }
  static getColor() {
    return "rgb(0, 150, 255)";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
