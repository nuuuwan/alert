import { COLORS } from "../../../view/_cons/StyleConstants";
import Unit from "./Unit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default class EarthquakeMagnitude extends Unit {
  static getLabel() {
    return "Earthquake";
  }
  static getUnitLabel() {
    return "ML";
  }
  static getIcon() {
    return WarningAmberIcon;
  }
  static getColor() {
    return COLORS.earth;
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
