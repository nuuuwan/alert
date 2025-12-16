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
      <Typography variant="body2" component="span" sx={{ fontSize: "75%" }}>
        {t(adminRegion.name)}
      </Typography>
      <Typography
        variant="caption"
        component="span"
        sx={{ ml: 0.5, opacity: 0.5, fontSize: "65%" }}
      >
        {t(adminRegion.constructor.getEntTypeNameShort())}
      </Typography>
    </Box>
  );
}
