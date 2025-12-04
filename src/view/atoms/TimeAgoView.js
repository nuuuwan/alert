import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";
import TimeUtils from "../../nonview/core/TimeUtils";

export default function TimeAgoView({ date, variant = "body1", color }) {
  const formattedDate = date.toLocaleString("en-US", DATE_TIME_FORMAT);
  const timeAgo = TimeUtils.getTimeAgoString(date);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant={variant} color={color}>
        {formattedDate} ({timeAgo})
      </Typography>
    </Box>
  );
}
