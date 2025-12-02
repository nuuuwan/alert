import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import WaterLevelChart from "./WaterLevelChart";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";
import {
  WaterLevelView,
  RateOfRiseView,
  SatelliteImageView,
  GaugeStationIcon,
} from "../atoms";

export default function StationDetails({
  station,
  stationToLatest,
  riverWaterLevelIdx,
}) {
  const latestLevel = stationToLatest[station.name];
  const alert = station.getAlert(latestLevel.waterLevelM);

  const date = latestLevel.date;
  const formattedDate = date.toLocaleString("en-US", DATE_TIME_FORMAT);

  // Check if data is older than 24 hours
  const now = new Date();
  const hoursSinceUpdate = (now - date) / (1000 * 60 * 60);
  const isStale = hoursSinceUpdate > 24;

  // Compute rate of rise/drop
  const measurements = riverWaterLevelIdx[station.name];
  let waterLevelDiff = null;
  let timeDiffHours = null;

  if (measurements && measurements.length >= 2) {
    const latest = measurements[measurements.length - 1];
    const secondLatest = measurements[measurements.length - 2];
    waterLevelDiff = latest.waterLevelM - secondLatest.waterLevelM;
    timeDiffHours = (latest.timeUt - secondLatest.timeUt) / 3600;
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="overline" color="text.secondary">
          {station.riverName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            dangerouslySetInnerHTML={{
              __html: GaugeStationIcon({
                size: 48,
                color: alert ? alert.colorRgb : "#888888",
                strokeColor: "white",
              }),
            }}
          />
          <Typography variant="h3" component="h1" color={alert.colorRgb}>
            {station.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Gauging Station
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1">{formattedDate}</Typography>
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
            waterLevelDiff={waterLevelDiff}
            timeDiffHours={timeDiffHours}
          />
        </Box>

        <SatelliteImageView latLng={station.latLng} name={station.name} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <WaterLevelChart station={station} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="caption" color="text.secondary">
        Data Source: Hydrology and Disaster Management Division, Irrigation
        Department of Sri Lanka.
      </Typography>
    </Box>
  );
}
