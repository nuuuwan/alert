import Unit from "./Unit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default class RainHours extends Unit {
  static getLabel() {
    return "Rain Hours";
  }
  static getUnitLabel() {
    return "h";
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
