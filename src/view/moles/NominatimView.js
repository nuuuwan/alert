import { useEffect, useState } from "react";
import Nominatim from "../../nonview/core/third_party/Nominatim";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { COLORS } from "../_cons/StyleConstants";
import MapIcon from "@mui/icons-material/Map";
import IconButton from "@mui/material/IconButton";

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
    return <CircularProgress />;
  }

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="caption" color={COLORS.neutralLight}>
        {data.display_name}
      </Typography>
    </Box>
  );
}

export default NominatimView;
