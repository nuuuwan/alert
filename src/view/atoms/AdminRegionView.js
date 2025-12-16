import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AdminRegionView({ AdminRegionClass, id }) {
  const [adminRegion, setAdminRegion] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchRegionData() {
      const region = await AdminRegionClass.loadFromId(id);
      setAdminRegion(region);
    }
    fetchRegionData();
  }, [AdminRegionClass, id]);

  if (!adminRegion) {
    return "...";
  }

  return (
    <Box component="span" color="white">
      <Typography variant="body2" component="span">
        {t(adminRegion.name)}
      </Typography>
    </Box>
  );
}
