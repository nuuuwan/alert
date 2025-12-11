import { useEffect, useState } from "react";
import Nominatim from "../../nonview/core/third_party/Nominatim";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { COLORS } from "../_cons/StyleConstants";

function NominatimView({ latLng }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!latLng) {
        return;
      }
      const result = await Nominatim.reverseGeocode(latLng);
      setData(result);
    }

    fetchData();
  }, [latLng]);

  if (!latLng) {
    return null;
  }

  if (!data) {
    return null;
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
