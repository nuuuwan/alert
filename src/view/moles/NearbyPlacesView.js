import { useEffect, useState } from "react";
import Nearby from "../../nonview/core/Nearby";
import PlaceLink from "../atoms/PlaceLink";
import CustomPaper from "../atoms/CustomPaper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";
import { CircularProgress } from "@mui/material";

export default function NearbyPlacesView({ latLng }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (latLng) {
        const nearby = await Nearby.findNearbyPlaces(latLng);
        setNearbyPlaces(nearby);
      }
    };

    fetchNearbyPlaces();
  }, [latLng]);

  return (
    <CustomPaper>
      <Typography variant="caption" color={COLORS.neutral} sx={{ mb: 1 }}>
        Nearby
      </Typography>
      <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
        {nearbyPlaces && nearbyPlaces.length > 0 ? (
          nearbyPlaces.map(([place, distanceM]) => (
            <PlaceLink key={place.id} place={place} distanceM={distanceM} />
          ))
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </CustomPaper>
  );
}
