import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import WaterLevelChart from "./WaterLevelChart";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";
import { WaterLevelView, RateOfRiseView, SatelliteImageView } from "../atoms";

export default function StationDetails({
  station,
  stationToLatest,
  riverWaterLevelIdx,
}) {
  const latestLevel = stationToLatest[station.name];
  const alert = station.getAlert(latestLevel.waterLevelM);

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
      {/* Top Pane: Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="overline" color="text.secondary">
          {station.riverName}
        </Typography>
        <Typography variant="h3" component="h1">
          {station.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Gauging Station
        </Typography>
        <Typography variant="body1">{formattedDate}</Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          mb: 1,
        }}
      >
        <Box margin={2}>
          <Box sx={{ mb: 2 }}>
            <WaterLevelView
              waterLevelM={latestLevel.waterLevelM}
              alert={alert}
            />
          </Box>

          <RateOfRiseView
            rateOfChangeCmPerHr={rateOfChangeCmPerHr}
            label={rateChipLabel}
            color={rateChipColor}
          />
        </Box>

        <SatelliteImageView latLng={station.latLng} name={station.name} />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Bottom Pane: Chart */}
      <WaterLevelChart station={station} />

      <Box
        sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="caption" color="text.secondary">
          Data Source: Hydrology and Disaster Management Division, Irrigation
          Department of Sri Lanka.
        </Typography>
      </Box>
    </Box>
  );
}
