import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";
import { STALE_DATA_BADGE } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/core/TimeUtils";

export default function TimeAgoView({
  date,
  variant = "body1",
  color,
  isStale,
}) {
  const formattedDate = date.toLocaleString("en-US", DATE_TIME_FORMAT);

  // Get humanized time difference
  const timeAgo = TimeUtils.getTimeAgoString(date);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant={variant} color={color}>
        {formattedDate} ({timeAgo})
      </Typography>
      {isStale && (
        <Box
          sx={{
            display: "inline-block",
            px: 1,
            py: 0.5,
            borderRadius: "12px",
            ...STALE_DATA_BADGE,
          }}
        >
          Stale Data
        </Box>
      )}
    </Box>
  );
}
