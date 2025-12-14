import Unit from "./Unit";
import TerrainIcon from "@mui/icons-material/Terrain";

export default class Elevation extends Unit {
  static getLabel() {
    return "Elevation";
  }
  static getUnitLabel() {
    return "m";
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
