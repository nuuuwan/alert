import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAlertMeta } from "../_cons/StyleConstants";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import L from "leaflet";
import SeverityIcon from "./SeverityIcon";

export default function AlertLegend() {
  const { t } = useTranslation();
  const legendItems = [3, 2, 1, 0].map((level) => getAlertMeta(level));

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      L.DomEvent.disableClickPropagation(ref.current);
    }
  }, []);

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "16px",
        left: "16px",
        zIndex: 1000,
        bgcolor: "rgba(255, 255, 255, 0.94)",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        boxShadow: 2,
        p: 1,
      }}
      onClick={onClick}
      ref={ref}
    >
      {legendItems.map((item) => (
        <Box
          key={item.level}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SeverityIcon
            level={item.level}
            sx={{ color: item.color, fontSize: 17 }}
          />
          <Typography variant="caption">{t(item.label)}</Typography>
        </Box>
      ))}
    </Box>
  );
}
