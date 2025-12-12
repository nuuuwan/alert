import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export default function AdminRegionView({ AdminRegionClass, id }) {
  const [adminRegion, setAdminRegion] = useState(null);

  useEffect(() => {
    async function fetchRegionData() {
      const region = await AdminRegionClass.loadFromId(id);
      setAdminRegion(region);
    }
    fetchRegionData();
  }, [AdminRegionClass, id]);

  if (!adminRegion) {
    return null;
  }

  return (
    <Box component="span">
      <Typography variant="body2" component="span">
        {adminRegion.name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        component="span"
        sx={{ ml: 0.5 }}
      >
        {adminRegion.constructor.getEntTypeNameShort()}
      </Typography>
    </Box>
  );
}
