import Unit from "./Unit";
import AirIcon from "@mui/icons-material/Air";
import { COLORS } from "../../../view/_cons/StyleConstants";

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
    return COLORS.air;
  }

  format() {
    return `${Math.round(this.value)}`;
  }
}
