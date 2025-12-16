import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";
import WarningIcon from "@mui/icons-material/Warning";
import Button from "@mui/material/Button";

export default function AlertLegend({ onViewDetails }) {
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
      <Button
        variant="contained"
        startIcon={<WarningIcon />}
        onClick={onViewDetails}
        sx={{
          marginTop: "8px",
          backgroundColor: "white",
          color: COLORS.neutral,
          textTransform: "none",
          fontSize: "12px",
          width: "100%",
        }}
      >
        View Alerts
      </Button>
    </Box>
  );
}
