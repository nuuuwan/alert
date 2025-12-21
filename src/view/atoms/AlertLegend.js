import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";
import { useTranslation } from "react-i18next";
export default function AlertLegend() {
  const { t } = useTranslation();
  const legendItems = [
    {
      label: "High Alert",
      color: COLORS.highAlert,
    },
    {
      label: "Medium Alert",
      color: COLORS.mediumAlert,
    },
    {
      label: "Low Alert",
      color: COLORS.lowAlert,
    },
    {
      label: "No Alert",
      color: COLORS.noAlert,
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        top: "16px",
        right: "16px",
        zIndex: 1000,
      }}
    >
      {legendItems.map((item) => (
        <Box
          key={item.label}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              width: "16px",
              height: "16px",
              backgroundColor: item.color,
              borderRadius: "2px",
            }}
          />
          <Typography variant="caption">{t(item.label)}</Typography>
        </Box>
      ))}
    </Box>
  );
}
