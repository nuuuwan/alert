import { COLORS } from "../../../view/_cons/StyleConstants";
import Unit from "./Unit";
import OpacityIcon from "@mui/icons-material/Opacity";

export default class SoilMoisture extends Unit {
  static getLabel() {
    return "Soil Moisture";
  }
  static getUnitLabel() {
    return "m³/m³";
  }
  static getIcon() {
    return OpacityIcon;
  }
  static getColor() {
    return COLORS.earth;
  }

  format() {
    return `${this.value.toFixed(2)}`;
  }
}
