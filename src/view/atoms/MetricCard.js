import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetricCard({
  label,
  value,
  unit,
  Icon,
  timeLabel,
  color,
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "white",
        border: "1px solid",
        borderColor: color,
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
        {Icon && <Icon fontSize="small" sx={{ color: color }} />}
        <Typography variant="caption" color={color}>
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
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 0.5, position: "relative", bottom: "2px" }}
        >{`${unit}`}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color={color}>
          {timeLabel}
        </Typography>
      </Box>
    </Box>
  );
}
