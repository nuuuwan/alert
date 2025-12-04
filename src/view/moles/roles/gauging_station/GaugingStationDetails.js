import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { WaterLevelView, RateOfRiseView, TimeAgoView } from "../../../atoms";
import WaterLevelChart from "./WaterLevelChart";
import GaugingStation from "../../../../nonview/core/roles/GaugingStation";
import RiverWaterLevelMeasurement from "../../../../nonview/core/events/RiverWaterLevelMeasurement";

export default function GaugingStationDetails({ ent: place }) {
  const [loading, setLoading] = useState(true);
  const [station, setStation] = useState(null);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Load the gauging station role
        const gaugingStation = await GaugingStation.fromID(place.id);
        setStation(gaugingStation);

        // Load measurements
        const measurements = (
          await RiverWaterLevelMeasurement.listForId(place.id)
        ).sort((a, b) => a.timeUt - b.timeUt);

        setMeasurements(measurements);
      } catch (error) {
        console.error("Error loading gauging station data:", error);
      }
      setLoading(false);
    }

    loadData();
  }, [place.id, place.name]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const latestMeasurement = measurements[measurements.length - 1];
  const previousMeasurement = measurements[measurements.length - 2];

  if (!station || !latestMeasurement) {
    return null;
  }

  const alert = station.getAlert(latestMeasurement.waterLevelM);

  // Calculate rate of rise
  let waterLevelDiff = null;
  let timeDiffHours = null;

  if (previousMeasurement) {
    waterLevelDiff =
      latestMeasurement.waterLevelM - previousMeasurement.waterLevelM;
    timeDiffHours =
      (latestMeasurement.timeUt - previousMeasurement.timeUt) / 3_600;
  }

  const isStale = !latestMeasurement.isWithinValidityWindow();

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mb: 2,
        }}
      >
        <WaterLevelView
          waterLevelM={latestMeasurement.waterLevelM}
          alert={alert}
        />
        {waterLevelDiff !== null && timeDiffHours !== null && (
          <RateOfRiseView
            waterLevelDiff={waterLevelDiff}
            timeDiffHours={timeDiffHours}
          />
        )}
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <TimeAgoView
          date={latestMeasurement.getDate()}
          variant="body2"
          isStale={isStale}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <WaterLevelChart station={station} measurements={measurements} />
    </Box>
  );
}
