import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  timeLabel,
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          mb: 0.5,
        }}
      >
        {Icon && <Icon fontSize="small" color="action" />}
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", my: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {unit}
      </Typography>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {timeLabel}
        </Typography>
      </Box>
    </Box>
  );
}
