import Typography from "@mui/material/Typography";
import NearbyPlacesView from "./NearbyPlacesView";
import AdminRegionView from "../atoms/AdminRegionView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import District from "../../nonview/core/ents/regions/admin_regions/District";
import Province from "../../nonview/core/ents/regions/admin_regions/Province";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTranslation } from "react-i18next";
import CustomPaper from "../atoms/CustomPaper";

export default function DetailsHeader({ ent }) {
  const dsd = ent.dsd;
  const { t } = useTranslation();

  return (
    <CustomPaper sx={{ width: 480 }}>
      <Typography variant="overline" color="text.secondary">
        {t(ent.supertitle)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t(ent.subtitle)}
      </Typography>
      {dsd && (
        <Breadcrumbs separator="›" sx={{ m: 0, p: 0 }}>
          <AdminRegionView AdminRegionClass={Province} id={dsd.provinceId} />
          <AdminRegionView AdminRegionClass={District} id={dsd.districtId} />
          <AdminRegionView AdminRegionClass={DSD} id={dsd.id} />
        </Breadcrumbs>
      )}
      <NearbyPlacesView latLng={ent.latLng} />
    </CustomPaper>
  );
}
