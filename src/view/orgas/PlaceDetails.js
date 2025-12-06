import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import EntDetails from "../moles/EntDetails";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function PlaceDetails({ place }) {
  const [placeWithDetails, setPlaceWithDetails] = useState(null);
  useEffect(() => {
    async function fetchDetails() {
      if (place) {
        const placeWithDetails = await place.loadDetails();
        setPlaceWithDetails(placeWithDetails);
      }
    }
    fetchDetails();
  }, [place]);

  if (!placeWithDetails) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <EntDetails ent={place} />
      <OpenMeteoView place={place} />
      <SatelliteImageView place={place} />
    </Box>
  );
}
