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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">{value}</Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 0.5, position: "relative", bottom: "2px" }}
        >{`${unit}`}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {timeLabel}
        </Typography>
      </Box>
    </Box>
  );
}
