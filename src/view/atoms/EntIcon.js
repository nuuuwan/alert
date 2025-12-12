import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import City from "../../nonview/core/ents/places/City";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterIcon from "@mui/icons-material/Water";
import MapIcon from "@mui/icons-material/Map";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";

function getIconClass(ent) {
  if (ent instanceof HydrometricStation) {
    return WaterIcon;
  }
  if (ent instanceof City) {
    return LocationCityIcon;
  }
  if (ent instanceof Place) {
    return LocationOnIcon;
  }
  if (ent instanceof AdminRegion) {
    return MapIcon;
  }
  return LocationOnIcon;
}

export default function EntIcon({ ent, color, size }) {
  color = color || COLORS.neutral;
  color = COLORS.highAlert;
  const IconClass = getIconClass(ent);
  return <IconClass sx={{ color, fontSize: size || 48 }} />;
}
