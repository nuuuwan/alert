import Unit from "./Unit";
import SpaIcon from "@mui/icons-material/Spa";

export default class DewPoint extends Temperature {
  static getLabel() {
    return "Dew Point";
  }
  static getIcon() {
    return SpaIcon;
  }
}
