import AdminRegionView from "../atoms/AdminRegionView";
import Stack from "@mui/material/Stack";

export default function DSDLocationBreadcrumbs({ ent }) {
  if (!ent || !ent.dsd || !ent.district) {
    return null;
  }
  return (
    <Stack direction="row" spacing={1}>
      <AdminRegionView regionEnt={ent.dsd} />,
      <AdminRegionView regionEnt={ent.district} />
    </Stack>
  );
}
