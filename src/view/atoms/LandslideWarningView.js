import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { COLORS } from "../_cons/StyleConstants";

export default function LandslideWarningView({ level }) {
  if (level == null) return null;
  let severity = "info";
  let text = "No Warning";
  let bgColor = COLORS.neutral;
  if (level === 1) {
    severity = "warning";
    text = "Level 1: Watch";
    bgColor = COLORS.lowAlert;
  } else if (level === 2) {
    severity = "warning";
    text = "Level 2: Alert";
    bgColor = COLORS.mediumAlert;
  } else if (level === 3) {
    severity = "error";
    text = "Level 3: Evacuate";
    bgColor = COLORS.highAlert;
  }
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Landslide Warning
      </Typography>

      <Alert
        severity={severity}
        variant="filled"
        sx={{ backgroundColor: bgColor }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {text}
        </Typography>
      </Alert>
    </Box>
  );
}
