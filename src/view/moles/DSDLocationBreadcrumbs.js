import AdminRegionView from "../atoms/AdminRegionView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import District from "../../nonview/core/ents/regions/admin_regions/District";
import Province from "../../nonview/core/ents/regions/admin_regions/Province";
import Stack from "@mui/material/Stack";

export default function DSDLocationBreadcrumbs({ dsd }) {
  if (!dsd) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1}>
      <AdminRegionView AdminRegionClass={DSD} id={dsd.id} />,
      <AdminRegionView AdminRegionClass={District} id={dsd.districtId} />
    </Stack>
  );
}
