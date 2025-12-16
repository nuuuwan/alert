import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";

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
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        fontSize: "12px",
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: "bold", display: "block", mb: 1 }}
      >
        Alert Levels
      </Typography>
      {legendItems.map((item) => (
        <Box
          key={item.label}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px",
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
    </Box>
  );
}
