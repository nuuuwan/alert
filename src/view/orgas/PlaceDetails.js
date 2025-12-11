import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import NaturalDisasterRisk from "../moles/NaturalDisasterRisk";
import PlaceSearch from "../moles/PlaceSearch";
import { useNavigate } from "react-router-dom";

export default function PlaceDetails({ place }) {
  const navigate = useNavigate();

  const handlePlaceSelect = (latLng) => {
    navigate(`/Place/${latLng.id}`);
  };

  return (
    <Box sx={{ p: 1, m: 1, mb: 10 }}>
      <Box sx={{ mb: 2 }}>
        <PlaceSearch onPlaceSelect={handlePlaceSelect} />
      </Box>
      {place instanceof HydrometricStation && (
        <HydrometricStationDetails place={place} />
      )}
      <NaturalDisasterRisk place={place} />
      <OpenElevationView place={place} />
      <OpenMeteoView place={place} />
      <SatelliteImageView place={place} />
    </Box>
  );
}
