import { useEffect, useState } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import LatLng from "../../nonview/base/geos/LatLng";
import { useNavigate } from "react-router-dom";
import GeoLocation from "../../nonview/base/GeoLocation";
import Box from "@mui/material/Box";
import Place from "../../nonview/core/ents/places/Place";
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
  const [selectedEnt, setSelectedEnt] = useState(null);
  const navigate = useNavigate();
  const hasSomeEntParam =
    dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;

  const [centerLatLng, setCenterLatLng] = useState(
    LatLng.fromRaw(DEFAULT_CENTER)
  );

  const onMapClickOrMoveEnd = async (latLng) => {
    navigate(`/Place/${latLng.id}`);
  };

  const center = centerLatLng.raw() || DEFAULT_CENTER;
  const zoom = DEFAULT_ZOOM;

  useEffect(() => {
    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
        setCenterLatLng(latLng);
        navigate(place.url);
      }
    }
    fetchBrowserLocation();
  }, [hasSomeEntParam, navigate]);

  const getFileName = () => {
    if (selectedEnt) {
      return `${selectedEnt.id}.png`;
    }
    return "location.png";
  };

  return (
    <Box>
      <TestModeBanner />
      <MapPanel
        center={center}
        zoom={zoom}
        onMapClickOrMoveEnd={onMapClickOrMoveEnd}
        dsdNameId={dsdNameId}
        hydrometricStationNameId={hydrometricStationNameId}
        cityNameId={cityNameId}
        placeLatLngId={placeLatLngId}
        setCenterLatLng={setCenterLatLng}
        selectedEnt={selectedEnt}
        setSelectedEnt={setSelectedEnt}
      />
      <DataPanel
        selectedEnt={selectedEnt}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
      />
    </Box>
  );
}
