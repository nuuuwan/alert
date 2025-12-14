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
    return "rgb(29, 190, 43)";
  }

  format() {
    return `${this.value.toFixed(2)}`;
  }
}
