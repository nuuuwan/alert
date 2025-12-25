import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import Hospital from "../../nonview/core/ents/places/Hospital";
import PoliceStation from "../../nonview/core/ents/places/PoliceStation";
import FireStation from "../../nonview/core/ents/places/FireStation";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { COLORS } from "../_cons/StyleConstants";
import City from "../../nonview/core/ents/places/City";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterIcon from "@mui/icons-material/Water";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import MapIcon from "@mui/icons-material/Map";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AdminRegion from "../../nonview/core/ents/regions/admin_regions/AdminRegion";

function getIconClass(ent) {
  if (ent instanceof HydrometricStation) {
    return WaterIcon;
  }
  if (ent instanceof Hospital) {
    return LocalHospitalIcon;
  }
  if (ent instanceof FireStation) {
    return LocalFireDepartmentIcon;
  }
  if (ent instanceof PoliceStation) {
    return LocalPoliceIcon;
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
  const IconClass = getIconClass(ent);
  return <IconClass sx={{ color, fontSize: size || 48 }} />;
}
