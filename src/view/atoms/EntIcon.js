import Place from "../../nonview/core/ents/places/Place";
import RiverStation from "../../nonview/core/ents/places/RiverStation";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";
import LocationIcon from "./icons/LocationIcon";
import RiverStationIcon from "./icons/RiverStationIcon";
import AdminRegionIcon from "./icons/AdminRegionIcon";

export default function EntIcon({ ent, ...props }) {
  if (ent instanceof RiverStation) {
    return <RiverStationIcon {...props} />;
  }
  if (ent instanceof AdminRegion) {
    return <AdminRegionIcon {...props} />;
  }
  if (ent instanceof Place) {
    return <LocationIcon {...props} />;
  }
  return <LocationIcon {...props} />;
}
