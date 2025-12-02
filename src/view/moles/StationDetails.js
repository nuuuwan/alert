import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WaterLevelChart from "./WaterLevelChart";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";

export default function StationDetails({
  station,
  stationToLatest,
  riverWaterLevelIdx,
}) {
  const latestLevel = stationToLatest[station.name];
  const alert = station.getAlert(latestLevel.waterLevelM);
  const alertColor = alert.colorRgb;

  const date = latestLevel.date;
  const formattedDate = date.toLocaleString("en-US", DATE_TIME_FORMAT);

  // Compute rate of rise/drop
  let rateOfChangeCmPerHr = null;
  let rateChipLabel = null;
  let rateChipColor = null;

  const measurements = riverWaterLevelIdx[station.name];
  if (measurements && measurements.length >= 2) {
    const latest = measurements[measurements.length - 1];
    const secondLatest = measurements[measurements.length - 2];

    const waterLevelDiff = latest.waterLevelM - secondLatest.waterLevelM;
    const timeDiffHours = (latest.timeUt - secondLatest.timeUt) / 3600;

    if (timeDiffHours > 0) {
      rateOfChangeCmPerHr = (waterLevelDiff / timeDiffHours) * 100;

      if (rateOfChangeCmPerHr > 0.01) {
        rateChipLabel = "Rising";
        rateChipColor = "rgb(211, 47, 47)"; // red
      } else if (rateOfChangeCmPerHr < -0.01) {
        rateChipLabel = "Falling";
        rateChipColor = "rgb(46, 125, 50)"; // green
      } else {
        rateChipLabel = "Steady";
        rateChipColor = "rgb(117, 117, 117)"; // grey
      }
    }
  }

  return (
    <Box>
      <Typography variant="h6">{station.riverName}</Typography>
      <Typography variant="h4" component="h1">
        {station.name}
      </Typography>
      <Typography
        variant="body1"
        component="h1"
        color="text.secondary"
        gutterBottom
      >
        Gauging Station
      </Typography>
      <Typography variant="body2">{formattedDate}</Typography>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 1 }}>
          <Typography variant="h3" component="span">
            {latestLevel.waterLevelM.toFixed(2)}
          </Typography>
          <Typography variant="h6" component="span" color="text.secondary">
            m
          </Typography>
        </Box>
        <Chip
          label={alert.label}
          sx={{
            backgroundColor: alertColor,
            color: "white",
            fontWeight: "bold",
          }}
        />
      </Box>

      {rateChipLabel && (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 0.5 }}
          >
            <Typography variant="h5" component="span">
              {rateOfChangeCmPerHr > 0 ? "+" : ""}
              {rateOfChangeCmPerHr.toFixed(0)}
            </Typography>
            <Typography variant="body2" component="span" color="text.secondary">
              cm/hr
            </Typography>
          </Box>
          <Chip
            label={rateChipLabel}
            size="small"
            sx={{
              backgroundColor: rateChipColor,
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <WaterLevelChart station={station} />
    </Box>
  );
}
