import { useState, useRef } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import LatLng from "../../nonview/base/geos/LatLng";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useNavigate } from "react-router-dom";
import EntDetails from "../moles/EntDetails";
import MapPanel from "./MapPanel";
import TestModeBanner from "../atoms/TestModeBanner";
import DownloadableContent from "../moles/DownloadableContent";
import Place from "../../nonview/core/ents/places/Place";

export default function MapView({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
}) {
  const [selectedEnt, setSelectedEnt] = useState(null);
  const navigate = useNavigate();
  const downloadRef = useRef(null);

  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [mapLatLng, setMapLatLng] = useState(LatLng.fromRaw(DEFAULT_CENTER));

  const center = mapLatLng.raw() || DEFAULT_CENTER;

  const handleCurrentLocation = () => {
    navigate("/");
  };

  const handleSetToMapCenter = () => {
    setSelectedLatLng(mapLatLng);
    const place = Place.fromLatLng(mapLatLng);
    navigate(place.url);
  };

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.download();
    }
  };

  const getFileName = () => {
    return `${selectedEnt.id}.png`;
  };

  return (
    <Box>
      <TestModeBanner />
      <Box
        sx={{
          position: "absolute",
          right: 10,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleCurrentLocation}
          aria-label="current location"
        >
          <MyLocationIcon />
        </IconButton>
        <IconButton
          onClick={handleSetToMapCenter}
          aria-label="set to map center"
        >
          <LocationSearchingIcon />
        </IconButton>
        <IconButton onClick={handleDownload} aria-label="download">
          <DownloadIcon />
        </IconButton>
      </Box>
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
            zoom={DEFAULT_ZOOM}
            //
            setSelectedLatLng={setSelectedLatLng}
            setMapLatLng={setMapLatLng}
          />
        </Box>
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
              <EntDetails ent={selectedEnt} />
            </Box>
          </DownloadableContent>
        </Box>
      </Box>
    </Box>
  );
}
