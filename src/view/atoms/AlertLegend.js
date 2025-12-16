import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";
import CustomPaper from "./CustomPaper";

export default function AlertLegend() {
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
    <CustomPaper
      sx={{
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "4px",
        fontSize: "12px",
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
          <Typography variant="caption">{item.label}</Typography>
        </Box>
      ))}
    </CustomPaper>
  );
}
