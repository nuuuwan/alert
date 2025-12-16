import Breadcrumbs from "@mui/material/Breadcrumbs";
import AdminRegionView from "../atoms/AdminRegionView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import District from "../../nonview/core/ents/regions/admin_regions/District";
import Province from "../../nonview/core/ents/regions/admin_regions/Province";
import CustomPaper from "../atoms/CustomPaper";

export default function DSDLocationBreadcrumbs({ dsd }) {
  if (!dsd) {
    return null;
  }

  return (
    <CustomPaper>
      <Breadcrumbs separator="›" sx={{ m: 0, p: 0 }}>
        <AdminRegionView AdminRegionClass={Province} id={dsd.provinceId} />
        <AdminRegionView AdminRegionClass={District} id={dsd.districtId} />
        <AdminRegionView AdminRegionClass={DSD} id={dsd.id} />
      </Breadcrumbs>
    </CustomPaper>
  );
}
