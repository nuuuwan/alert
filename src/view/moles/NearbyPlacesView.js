import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Nearby from "../../nonview/core/Nearby";
import PlaceLink from "../atoms/PlaceLink";
import Typography from "@mui/material/Typography";

export default function NearbyPlacesView({ latLng }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const nearby = await Nearby.findNearbyHydrometricStations(latLng);
      setNearbyPlaces(nearby);
    };

    fetchNearbyPlaces();
  }, [latLng]);

  if (nearbyPlaces.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        Nearby
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
        }}
      >
        {nearbyPlaces.map(([place, distanceM]) => (
          <PlaceLink key={place.id} place={place} distanceM={distanceM} />
        ))}
      </Box>
    </Box>
  );
}
