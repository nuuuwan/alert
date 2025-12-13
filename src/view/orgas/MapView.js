import { useState } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import Box from "@mui/material/Box";
import EntDetails from "../moles/EntDetails";
import MapPanel from "./MapPanel";
import TestModeBanner from "../atoms/TestModeBanner";
import DownloadableContent from "../moles/DownloadableContent";

export default function MapView({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  setTitle,
  pageMode,
  downloadRef,
  mapLatLng,
  setMapLatLng,
}) {
  const [selectedEnt, setSelectedEnt] = useState(null);

  const center = mapLatLng.raw() || DEFAULT_CENTER;

  const getFileName = () => {
    return `${selectedEnt.id}.png`;
  };

  console.debug({ pageMode });

  if (pageMode === "Map") {
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
        />
      </Box>
    );
  }

  if (pageMode === "Alerts") {
    return (
      <Box
        sx={{
          width: { xs: "100vw", md: "calc(100vw - 100vh)" },
          height: { xs: "auto", md: "100vh" },
          maxHeight: { xs: "100vh", md: "100vh" },
          overflow: "auto",
        }}
      >
        <DownloadableContent
          ref={downloadRef}
          getFileName={getFileName}
          selectedItem={selectedEnt}
        >
          <Box>
            <EntDetails ent={selectedEnt} setTitle={setTitle} />
          </Box>
        </DownloadableContent>
      </Box>
    );
  }
  return null;
}
