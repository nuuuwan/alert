import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import DSDDetails from "./DSDDetails";

export default function RegionDetails({ region }) {
  if (region instanceof DSD) {
    return <DSDDetails region={region} />;
  }
  return null;
}
