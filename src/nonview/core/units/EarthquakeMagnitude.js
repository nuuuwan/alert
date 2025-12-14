import Unit from "./Unit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default class EarthquakeMagnitude extends Unit {
  static getLabel() {
    return "Earthquake Magnitude";
  }
  static getUnitLabel() {
    return "ML";
  }
  static getIcon() {
    return WarningAmberIcon;
  }
  static getColor() {
    return "rgb(255, 152, 0)";
  }

  format() {
    return `${this.value.toFixed(1)}`;
  }
}
