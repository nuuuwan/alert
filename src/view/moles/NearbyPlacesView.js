import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import EntIcon from "../atoms/EntIcon";
import { COLORS } from "../_cons/StyleConstants";

export default function NearbyPlacesView({ latLng }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const allHydrometricStations = await HydrometricStation.loadAll();
      const nearby = allHydrometricStations
        .map(function (station) {
          return [station, station.latLng.distanceTo(latLng)];
        })
        .sort(function (a, b) {
          return a[1] - b[1];
        })
        .slice(0, 3);
      setNearbyPlaces(nearby);
    };

    fetchNearbyPlaces();
  }, [latLng]);

  if (nearbyPlaces.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {nearbyPlaces.map(([place, distanceM]) => (
        <Box
          key={place.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            padding: 1,
          }}
        >
          <EntIcon ent={place} size={18} />
          <Link
            href={`#place-${place.id}`}
            underline="hover"
            sx={{ color: COLORS.neutral }}
          >
            {place.name}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {(distanceM / 1000).toFixed(1)}km
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
