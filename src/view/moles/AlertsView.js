import Box from "@mui/material/Box";
import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";

export default function AlertsView({ selectedEnt, setTitle }) {
  const place = selectedEnt;
  if (!place) {
    return null;
  }
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        marginTop: "56px",
        zIndex: 200,
        overflow: "auto",
      }}
    >
      <NaturalDisasterOfficialView place={place} />
      <NaturalDisasterView place={place} />
    </Box>
  );
}
