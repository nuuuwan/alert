import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import Box from "@mui/material/Box";
import MapPanel from "./MapPanel";

export default function MapView({
  mapLatLng,
  setMapLatLng,
  //
  pageMode,
  setPageMode,
}) {
  const center = mapLatLng.raw() || DEFAULT_CENTER;

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 100,
      }}
    >
      <MapPanel
        center={center}
        zoom={DEFAULT_ZOOM}
        //
        setMapLatLng={setMapLatLng}
        //
        pageMode={pageMode}
        setPageMode={setPageMode}
      />
    </Box>
  );
}
