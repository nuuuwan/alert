import Unit from "./Unit";
import TerrainIcon from "@mui/icons-material/Terrain";

export default class Slope extends Unit {
  static getLabel() {
    return "Slope";
  }
  static getUnitLabel() {
    return "°";
  }
  static getIcon() {
    return TerrainIcon;
  }
  static getColor() {
    return "rgb(139, 90, 43)";
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
