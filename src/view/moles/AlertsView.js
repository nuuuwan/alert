import Box from "@mui/material/Box";
import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";

export default function AlertsView({ selectedEnt, setTitle }) {
  const place = selectedEnt;
  if (!place) {
    return null;
  }
  return (
    <Box>
      <NaturalDisasterOfficialView place={place} />
      <NaturalDisasterView place={place} />
    </Box>
  );
}
