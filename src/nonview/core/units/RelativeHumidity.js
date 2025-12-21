import { COLORS } from "../../../view/_cons/StyleConstants";
import Unit from "./Unit";
import OpacityIcon from "@mui/icons-material/Opacity";

export default class RelativeHumidity extends Unit {
  static getLabel() {
    return "Relative Humidity";
  }
  static getUnitLabel() {
    return "%";
  }
  static getIcon() {
    return OpacityIcon;
  }
  static getColor() {
    return COLORS.water;
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
