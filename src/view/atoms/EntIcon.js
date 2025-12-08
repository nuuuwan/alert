import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";
import LocationIcon from "./icons/LocationIcon";
import HydrometricStationIcon from "./icons/HydrometricStationIcon";
import AdminRegionIcon from "./icons/AdminRegionIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";

export default function EntIcon({ ent, ...props }) {
  const color = getAlertColor(ent.alertLevel) || COLORS.neutral;

  if (ent instanceof HydrometricStation) {
    return <HydrometricStationIcon color={color} {...props} />;
  }
  if (ent instanceof Place) {
    return <LocationIcon color={color} {...props} />;
  }
  if (ent instanceof AdminRegion) {
    return <AdminRegionIcon color={color} {...props} />;
  }
  console.error("EntIcon: Unknown ent type", ent);
  return null;
}
