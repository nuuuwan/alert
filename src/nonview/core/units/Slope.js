import Unit from "./Unit";
import TerrainIcon from "@mui/icons-material/Terrain";
import { COLORS } from "../../../view/_cons/StyleConstants";

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
    return COLORS.earth;
  }

  format() {
    return `${this.value.toFixed(0)}`;
  }
}
