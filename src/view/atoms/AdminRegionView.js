import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function AdminRegionView({ regionEnt }) {
  const { t } = useTranslation();
  if (!regionEnt) {
    return null;
  }

  return (
    <Typography
      component="span"
      variant="caption"
      color="text.secondary"
      noWrap
      sx={{ display: "inline-block", lineHeight: 1.2, minWidth: 0 }}
    >
      {t(regionEnt.name)} {t(regionEnt.constructor.getEntTypeNameShort())}
    </Typography>
  );
}
