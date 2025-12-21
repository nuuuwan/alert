import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function AdminRegionView({ regionEnt }) {
  const { t } = useTranslation();
  if (!regionEnt) {
    return null;
  }

  return (
    <Box component="span" color="white">
      <Typography variant="body2" component="span" sx={{ fontSize: "75%" }}>
        {t(regionEnt.name)}
      </Typography>
      <Typography
        variant="caption"
        component="span"
        sx={{ ml: 0.5, fontSize: "65%" }}
      >
        {t(regionEnt.constructor.getEntTypeNameShort())}
      </Typography>
    </Box>
  );
}
