import Unit from "./Unit";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default class WaterLevelRateOfChange extends Unit {
  static getLabel() {
    return "Rate of Rise";
  }
  static getUnitLabel() {
    return "cm/h";
  }
  static getIcon() {
    return TrendingUpIcon;
  }
  static getColor() {
    return "rgb(255, 152, 0)";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
