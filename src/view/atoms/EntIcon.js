import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";
import HydrometricStationIcon from "./icons/HydrometricStationIcon";
import AdminRegionIcon from "./icons/AdminRegionIcon";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import City from "../../nonview/core/ents/places/City";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function EntIcon({ ent, color, size }) {
  color = color || getAlertColor(ent.alertLevel) || COLORS.neutral;

  if (ent instanceof HydrometricStation) {
    return <HydrometricStationIcon color={color} size={size} />;
  }
  if (ent instanceof City) {
    return <LocationCityIcon style={{ color }} sx={{ fontSize: size || 48 }} />;
  }
  if (ent instanceof Place) {
    return <LocationOnIcon style={{ color }} sx={{ fontSize: size || 48 }} />;
  }
  if (ent instanceof AdminRegion) {
    return <AdminRegionIcon color={color} size={size} />;
  }
  return <LocationOnIcon style={{ color }} sx={{ fontSize: size || 48 }} />;
}
