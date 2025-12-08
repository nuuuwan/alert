import Place from "../../nonview/core/ents/places/Place";
import RiverStation from "../../nonview/core/ents/places/RiverStation";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";
import LocationIcon from "./icons/LocationIcon";
import RiverStationIcon from "./icons/RiverStationIcon";
import AdminRegionIcon from "./icons/AdminRegionIcon";
import { COLORS } from "../_cons/StyleConstants";

export default function EntIcon({ ent, ...props }) {
  const color =
    ["grey", COLORS.lowAlert, COLORS.mediumAlert, COLORS.highAlert][
      ent.alertLevel
    ] || "gray";

  if (ent instanceof RiverStation) {
    return <RiverStationIcon color={color} {...props} />;
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
