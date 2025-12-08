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
        width: 200,
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h6" color={foreColor}>
          {alertLabel}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        {Icon && <Icon fontSize="small" sx={{ color: foreColor }} />}
        <Typography variant="caption" color={foreColor}>
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
        }}
      >
        <Typography variant="h5" color={foreColor} fontWeight={"bold"}>
          {value}
        </Typography>
        <Typography
          variant="caption"
          color={foreColor}
          sx={{ ml: 0.5, position: "relative", bottom: "4px" }}
        >{`${unit}`}</Typography>
      </Box>

      <Box>
        <Typography variant="caption" color={foreColor} sx={{ opacity: 0.6 }}>
          {timeLabel}
        </Typography>
      </Box>
    </Box>
  );
}
