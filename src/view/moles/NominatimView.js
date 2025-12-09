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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        {data.display_name}
      </Typography>
    </Box>
  );
}

export default NominatimView;
