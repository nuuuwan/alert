import { useEffect, useState } from "react";
import Nominatim from "../../nonview/core/third_party/Nominatim";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminRegionView from "../atoms/AdminRegionView";
import District from "../../nonview/core/ents/regions/admin_regions/District";
import Province from "../../nonview/core/ents/regions/admin_regions/Province";

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
  const districtId = address["ISO3166-2-lvl5"];
  const provinceId = address["ISO3166-2-lvl4"];

  return (
    <Box>
      <Typography variant="body1" color="textSecondary">
        {[amenity, house_number, road].filter(Boolean).join(", ")}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {[suburb, city || village].filter(Boolean).join(", ")}
      </Typography>
      <Box>
        <AdminRegionView AdminRegionClass={District} id={districtId} />
        <AdminRegionView AdminRegionClass={Province} id={provinceId} />
      </Box>
    </Box>
  );
}

export default NominatimView;
