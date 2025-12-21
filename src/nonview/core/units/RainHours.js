import { COLORS } from "../../../view/_cons/StyleConstants";
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
    return COLORS.water;
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
