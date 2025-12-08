import Place from "../../nonview/core/ents/places/Place";
import RiverStation from "../../nonview/core/ents/places/RiverStation";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";
import LocationIcon from "./icons/LocationIcon";
import RiverStationIcon from "./icons/RiverStationIcon";
import AdminRegionIcon from "./icons/AdminRegionIcon";
import { COLORS } from "../_cons/StyleConstants";

export default function EntIcon({ ent, ...props }) {
  const entityTypeName = ent.constructor.getEntTypeName();
  const color =
    ["grey", COLORS.lowAlert, COLORS.mediumAlert, COLORS.highAlert][
      ent.alertLevel
    ] || "gray";

  switch (entityTypeName) {
    case RiverStation.getEntTypeName():
      return <RiverStationIcon {...props} color={color} />;
    case Place.getEntTypeName():
      return <LocationIcon {...props} />;
    case AdminRegion.getEntTypeName():
      return <AdminRegionIcon {...props} />;
    default:
      return null;
  }
}
