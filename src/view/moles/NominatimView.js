import React, { useEffect, useState } from "react";
import Nominatim from "../../nonview/core/third_party/Nominatim";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function NominatimView({ latlng }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Nominatim.reverseGeocode(latlng);
        setData(result);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, [latlng]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.address) {
    return <div>Loading...</div>;
  }

  const address = data.address;
  const { amenity, house_number, road, suburb, city, village } = address;

  return (
    <Box>
      <Typography variant="body1" color="textSecondary">
        {[amenity, house_number, road].filter(Boolean).join(", ")}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {[suburb, city || village].filter(Boolean).join(", ")}
      </Typography>
    </Box>
  );
}

export default NominatimView;
