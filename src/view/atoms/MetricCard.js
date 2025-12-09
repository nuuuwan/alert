import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function MetricCard({
  label,
  value,
  unit,
  Icon,
  timeLabel,
  alertLabel,
  color,
  isPrediction,
}) {
  let foreColor = COLORS.neutral;
  let backColor = "white";
  if (color !== COLORS.neutral && color !== undefined) {
    foreColor = "white";
    backColor = color;
  }

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 2,
        backgroundColor: backColor,
        border: "3px solid",
        borderColor: foreColor,
        textAlign: "center",
        width: 150,
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden", // Ensure content does not overflow
      }}
    >
      <Box>
        <Typography variant="h6" color={foreColor} noWrap>
          {alertLabel}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          overflow: "hidden", // Prevent overflow in this section
        }}
      >
        {Icon && <Icon fontSize="small" sx={{ color: foreColor }} />}
        <Typography variant="caption" color={foreColor} noWrap>
          {label}
        </Typography>
        {isPrediction && (
          <AutoAwesomeIcon fontSize="small" sx={{ color: foreColor }} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden", // Prevent overflow in this section
        }}
      >
        <Typography variant="h5" color={foreColor} fontWeight={"bold"} noWrap>
          {value}
        </Typography>
        <Typography
          variant="caption"
          color={foreColor}
          sx={{ ml: 0.5, position: "relative", bottom: "4px" }}
          noWrap
        >{`${unit}`}</Typography>
      </Box>

      <Box>
        <Typography
          variant="caption"
          color={foreColor}
          sx={{ opacity: 0.6 }}
          noWrap
        >
          {timeLabel}
        </Typography>
      </Box>
    </Box>
  );
}
