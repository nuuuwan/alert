import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EntIcon from "../atoms/EntIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import Divider from "@mui/material/Divider";
import NearbyPlacesView from "./NearbyPlacesView";
import AdminRegionView from "../atoms/AdminRegionView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import District from "../../nonview/core/ents/regions/admin_regions/District";
import Province from "../../nonview/core/ents/regions/admin_regions/Province";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTranslation } from "react-i18next";

export default function DetailsHeader({ ent }) {
  const size = 24;
  const color = getAlertColor(ent.alertLevel) || COLORS.neutral;
  const dsd = ent.dsd;
  const { t } = useTranslation();

  return (
    <Box sx={{ m: 0, p: 0 }}>
      {dsd && (
        <Breadcrumbs separator="›" sx={{ m: 0, p: 0 }}>
          <AdminRegionView AdminRegionClass={Province} id={dsd.provinceId} />
          <AdminRegionView AdminRegionClass={District} id={dsd.districtId} />
          <AdminRegionView AdminRegionClass={DSD} id={dsd.id} />
        </Breadcrumbs>
      )}

      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <EntIcon ent={ent} size={size} />
        <Typography variant="h5" sx={{ lineHeight: `${size}px` }} color={color}>
          {t(ent.title)}
        </Typography>
      </Box>

      <Typography variant="overline" color="text.secondary">
        {t(ent.supertitle)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t(ent.subtitle)}
      </Typography>

      <NearbyPlacesView latLng={ent.latLng} />
      <Divider sx={{ my: 1 }} />
    </Box>
  );
}
