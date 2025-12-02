import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TimeAgoView } from "../atoms";

export default function DetailsHeader({
  overlineText,
  title,
  titleColor,
  subtitle,
  date,
  icon,
  iconSize = 48,
  iconColor,
  iconStrokeColor = "white",
}) {
  return (
    <Box sx={{ mb: 2 }}>
      {overlineText && (
        <Typography variant="overline" color="text.secondary">
          {overlineText}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        {icon && (
          <Box
            dangerouslySetInnerHTML={{
              __html: icon({
                size: iconSize,
                color: iconColor,
                strokeColor: iconStrokeColor,
              }),
            }}
          />
        )}
        <Typography variant="h3" component="h1" color={titleColor}>
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
      {date && <TimeAgoView date={date} />}
    </Box>
  );
}
