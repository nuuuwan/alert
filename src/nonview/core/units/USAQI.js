import Unit from "./Unit";
import AirIcon from "@mui/icons-material/Air";

export default class USAQI extends Unit {
  static getLabel() {
    return "US Air Quality Index";
  }
  static getUnitLabel() {
    return "AQI";
  }
  static getIcon() {
    return AirIcon;
  }
  static getColor() {
    return "rgb(76, 175, 80)";
  }

  format() {
    return `${Math.round(this.value)}`;
  }
}
