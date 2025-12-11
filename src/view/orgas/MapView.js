import { useState } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import LatLng from "../../nonview/base/geos/LatLng";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import DataPanel from "../moles/DataPanel";
import EntDetails from "../moles/EntDetails";
import MapPanel from "./MapPanel";
import TestModeBanner from "../atoms/TestModeBanner";

export default function MapView({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
}) {
  const navigate = useNavigate();
  const [selectedEnt, setSelectedEnt] = useState(null);

  const [centerLatLng, setCenterLatLng] = useState(
    LatLng.fromRaw(DEFAULT_CENTER)
  );

  const onMapClickOrMoveEnd = async (latLng) => {
    navigate(`/Place/${latLng.id}`);
  };

  const center = centerLatLng.raw() || DEFAULT_CENTER;
  const zoom = DEFAULT_ZOOM;

  return (
    <Box>
      <TestModeBanner />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { xs: "100vh", md: "100vh" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100vw", md: "100vh" },
            height: { xs: "100vw", md: "100vh" },
            aspectRatio: "1 / 1",
          }}
        >
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
            zoom={zoom}
            //
            onMapClickOrMoveEnd={onMapClickOrMoveEnd}
            setCenterLatLng={setCenterLatLng}
          />
        </Box>
        <Box
          sx={{
            height: { xs: "60vh", md: "100vh" },
            width: { xs: "100%", md: "40%" },
            overflow: "auto",
          }}
        >
          <DataPanel
            selectedEnt={selectedEnt}
            renderContent={(ent) => <EntDetails ent={ent} />}
          />
        </Box>
      </Box>
    </Box>
  );
}
