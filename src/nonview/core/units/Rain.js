import Unit from "./Unit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default class Rain extends Unit {
  static getLabel() {
    return "Rain";
  }
  static getUnitLabel() {
    return "mm";
  }
  static getIcon() {
    return ThunderstormIcon;
  }
  static getColor() {
    return "rgb(0, 150, 255)";
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
