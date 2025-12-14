import Typography from "@mui/material/Typography";
import NearbyPlacesView from "./NearbyPlacesView";
import AdminRegionView from "../atoms/AdminRegionView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import District from "../../nonview/core/ents/regions/admin_regions/District";
import Province from "../../nonview/core/ents/regions/admin_regions/Province";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTranslation } from "react-i18next";
import CustomPaper from "../atoms/CustomPaper";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

export default function DetailsHeader({ ent }) {
  const { t } = useTranslation();
  const dsd = ent?.dsd;
  return (
    <Box>
      <CustomPaper>
        <Typography variant="overline" color="text.secondary">
          {ent ? t(ent.supertitle) : <CircularProgress />}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ent ? t(ent.subtitle) : <CircularProgress />}
        </Typography>
        {dsd && (
          <Breadcrumbs separator="›" sx={{ m: 0, p: 0 }}>
            <AdminRegionView AdminRegionClass={Province} id={dsd.provinceId} />
            <AdminRegionView AdminRegionClass={District} id={dsd.districtId} />
            <AdminRegionView AdminRegionClass={DSD} id={dsd.id} />
          </Breadcrumbs>
        )}
      </CustomPaper>
      <NearbyPlacesView latLng={ent ? ent.latLng : null} />
    </Box>
  );
}
