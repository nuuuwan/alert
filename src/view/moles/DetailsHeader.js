import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { COLORS } from "../_cons/StyleConstants";

export default function DetailsHeader({
  overlineText,
  title,
  titleColor,
  subtitle,
  date,
  Icon,
  iconSize = 48,
  iconColor,
  iconStrokeColor = COLORS.white,
  isStale,
}) {
  return (
    <Box sx={{ mb: 2 }}>
      {overlineText && (
        <Typography variant="overline" color="text.secondary">
          {overlineText}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 1 }}>
        {Icon && (
          <Box
            sx={{
              height: iconSize,
              width: iconSize,
              marginTop: "4px",
            }}
            dangerouslySetInnerHTML={{
              __html: Icon({
                size: iconSize,
                color: iconColor,
                strokeColor: iconStrokeColor,
              }),
            }}
          />
        )}
        <Typography
          variant="h3"
          component="h1"
          color={titleColor}
          sx={{
            lineHeight: `${iconSize}px`,
          }}
        >
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
