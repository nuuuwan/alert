import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import Box from "@mui/material/Box";
import MapPanel from "./MapPanel";
import TestModeBanner from "../atoms/TestModeBanner";

export default function MapView({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  //
  mapLatLng,
  setMapLatLng,
  //
  selectedEnt,
  setSelectedEnt,
  //
  pageMode,
  setPageMode,

  //
  onCurrentLocation,
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
      <TestModeBanner />

      <MapPanel
        dsdNameId={dsdNameId}
        hydrometricStationNameId={hydrometricStationNameId}
        cityNameId={cityNameId}
        placeLatLngId={placeLatLngId}
        //
        selectedEnt={selectedEnt}
        setSelectedEnt={setSelectedEnt}
        //
        center={center}
        zoom={DEFAULT_ZOOM}
        //
        setMapLatLng={setMapLatLng}
        //
        pageMode={pageMode}
        setPageMode={setPageMode}
        //
        onCurrentLocation={onCurrentLocation}
      />
    </Box>
  );
}
