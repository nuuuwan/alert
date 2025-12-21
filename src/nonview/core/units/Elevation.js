import Unit from "./Unit";
import TerrainIcon from "@mui/icons-material/Terrain";
import { COLORS } from "../../../view/_cons/StyleConstants";

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
    return COLORS.earth;
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
