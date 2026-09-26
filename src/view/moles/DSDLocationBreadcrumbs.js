import AdminRegionView from "../atoms/AdminRegionView";
import Stack from "@mui/material/Stack";

export default function DSDLocationBreadcrumbs({ ent }) {
  if (!ent || !ent.dsd || !ent.district) {
    return null;
  }
  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="baseline"
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        color: "text.secondary",
      }}
    >
      <AdminRegionView regionEnt={ent.dsd} />
      <span aria-hidden="true" style={{ lineHeight: 1 }}>
        ·
      </span>
      <AdminRegionView regionEnt={ent.district} />
    </Stack>
  );
}
