import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { WaterLevelView, RateOfRiseView } from "../../../atoms";
import WaterLevelChart from "./WaterLevelChart";
import GaugingStation from "../../../../nonview/core/roles/GaugingStation";
import RiverWaterLevelMeasurement from "../../../../nonview/core/events/RiverWaterLevelMeasurement";

export default function GaugingStationDetails({
  ent: place,
  latestEvent,
  isStale = false,
}) {
  const [loading, setLoading] = useState(true);
  const [station, setStation] = useState(null);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const gaugingStation = await GaugingStation.fromID(place.id);
        setStation(gaugingStation);
        const measurements = await RiverWaterLevelMeasurement.listForId(
          place.id
        );
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

  const latestMeasurement = measurements[0];
  const previousMeasurement = measurements[1];
  if (!station || !latestMeasurement || !previousMeasurement) {
    return null;
  }

  const waterLevelDiff =
    latestMeasurement.waterLevelM - previousMeasurement.waterLevelM;
  const timeDiffHours =
    (latestMeasurement.timeUt - previousMeasurement.timeUt) / 3_600;

  if (timeDiffHours < 0) {
    throw new Error("Negative timeDiffHours.");
  }

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
          isStale={isStale}
        />
        <RateOfRiseView
          waterLevelDiff={waterLevelDiff}
          timeDiffHours={timeDiffHours}
          isStale={isStale}
        />
      </Box>

      <WaterLevelChart station={station} measurements={measurements} />
    </Box>
  );
}
