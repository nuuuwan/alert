import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";

export default function TimeAgoView({ date, variant = "body1", color }) {
  const formattedDate = date.toLocaleString("en-US", DATE_TIME_FORMAT);

  // Calculate time difference
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Check if data is stale (older than 24 hours)
  const hoursSinceUpdate = diffMs / (1000 * 60 * 60);
  const isStale = hoursSinceUpdate > 24;

  // Humanize the time difference
  let timeAgo;
  if (diffDays > 0) {
    timeAgo = `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffHours > 0) {
    timeAgo = `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffMinutes > 0) {
    timeAgo = `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else {
    timeAgo = `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
  }

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
            backgroundColor: "#888888",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          Stale Data
        </Box>
      )}
    </Box>
  );
}
