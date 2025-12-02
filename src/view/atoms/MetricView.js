import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MetricView({
  label,
  value,
  unit,
  badge,
  badgeColor,
  valueVariant = "h3",
  unitVariant = "h6",
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ textTransform: "uppercase" }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 1 }}>
        <Typography variant={valueVariant} component="span">
          {value}
        </Typography>
        <Typography
          variant={unitVariant}
          component="span"
          color="text.secondary"
        >
          {unit}
        </Typography>
      </Box>
      {badge && (
        <Box
          sx={{
            display: "inline-block",
            backgroundColor: badgeColor,
            color: "white",
            fontWeight: "bold",
            fontSize: valueVariant === "h3" ? "0.8125rem" : "0.75rem",
            fontFamily: "Ubuntu Sans, sans-serif",
            px: valueVariant === "h3" ? 1.5 : 1.25,
            py: valueVariant === "h3" ? 0.5 : 0.375,
            borderRadius: valueVariant === "h3" ? "16px" : "12px",
          }}
        >
          {badge}
        </Box>
      )}
    </Box>
  );
}
