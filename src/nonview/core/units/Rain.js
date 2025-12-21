import { COLORS } from "../../../view/_cons/StyleConstants";
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
    return COLORS.water;
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
