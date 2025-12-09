import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";
import LocationIcon from "./icons/LocationIcon";
import HydrometricStationIcon from "./icons/HydrometricStationIcon";
import AdminRegionIcon from "./icons/AdminRegionIcon";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import City from "../../nonview/core/ents/places/City";

export default function EntIcon({ ent, ...props }) {
  const color = getAlertColor(ent.alertLevel) || COLORS.neutral;

  if (ent instanceof HydrometricStation) {
    return <HydrometricStationIcon color={color} {...props} />;
  }
  if (ent instanceof City) {
    return (
      <LocationCityIcon
        style={{ color }}
        {...props}
        sx={{ fontSize: props.size || 48 }}
      />
    );
  }
  if (ent instanceof Place) {
    return <LocationIcon color={color} {...props} />;
  }
  if (ent instanceof AdminRegion) {
    return <AdminRegionIcon color={color} {...props} />;
  }
  console.error("EntIcon: Unknown ent type", ent, typeof ent);
  return null;
}
