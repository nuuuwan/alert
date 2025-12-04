import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { COLORS, BADGE_STYLES } from "../_cons/StyleConstants";

export default function MetricView({
  label,
  value,
  unit,
  badge,
  badgeColor,
  valueVariant = "h3",
  unitVariant = "h6",
  isStale = false,
}) {
  const displayColor = isStale ? COLORS.gray : badgeColor;

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
        <Typography
          variant={valueVariant}
          component="span"
          color={displayColor}
        >
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
            backgroundColor: displayColor,
            color: COLORS.white,
            fontWeight: "bold",
            ...(valueVariant === "h3"
              ? BADGE_STYLES.medium
              : BADGE_STYLES.small),
          }}
        >
          {badge}
        </Box>
      )}
    </Box>
  );
}
