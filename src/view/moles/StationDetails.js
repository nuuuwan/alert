import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import WaterLevelChart from "./WaterLevelChart";
import DetailsHeader from "./DetailsHeader";
import { COLORS } from "../_cons/StyleConstants";

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

  // Compute rate of rise/drop using 10 measurement window
  const measurements = riverWaterLevelIdx[station.name];
  let waterLevelDiff = null;
  let timeDiffHours = null;

  if (measurements && measurements.length >= 11) {
    const latest = measurements[measurements.length - 1];
    const tenth = measurements[measurements.length - 11];
    waterLevelDiff = latest.waterLevelM - tenth.waterLevelM;
    timeDiffHours = (latest.timeUt - tenth.timeUt) / 3600;
  } else if (measurements && measurements.length >= 2) {
    const latest = measurements[measurements.length - 1];
    const secondLatest = measurements[measurements.length - 2];
    waterLevelDiff = latest.waterLevelM - secondLatest.waterLevelM;
    timeDiffHours = (latest.timeUt - secondLatest.timeUt) / 3600;
  }

  return (
    <Box>
      <DetailsHeader
        overlineText={station.riverName}
        title={station.name}
        titleColor={alert?.colorRgb}
        subtitle="Gauging Station"
        date={date}
        icon={GaugeStationIcon}
        iconColor={alert ? alert.colorRgb : COLORS.gray}
      />

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
