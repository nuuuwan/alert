import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import WavesIcon from "@mui/icons-material/Waves";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import MetricCard from "../atoms/MetricCard";
import WaterLevelChart from "../atoms/WaterLevelChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function RiverStationDetails({ place }) {
  const [loading, setLoading] = useState(true);
  const [waterLevelHistory, setWaterLevelHistory] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        await place.loadDetails();
        setWaterLevelHistory(place.waterLevelHistory || []);
      } catch (error) {
        console.error("Error loading water level history:", error);
      }
      setLoading(false);
    }

    loadData();
  }, [place]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (waterLevelHistory.length === 0) {
    return null;
  }

  const latestReading = waterLevelHistory[0];
  const previousReading = waterLevelHistory[10];
  let rateOfChangeData = null;
  if (previousReading) {
    const waterLevelDiff =
      latestReading.waterLevelM - previousReading.waterLevelM;
    const timeDiffHours =
      (latestReading.timeUt - previousReading.timeUt) / 3600;
    const rateOfChangeCmPerHr = (waterLevelDiff / timeDiffHours) * 100;
    const EPSILON = 0.1;

    let label, color, icon;
    if (rateOfChangeCmPerHr > EPSILON) {
      label = "Rising";
      color = COLORS.highAlert;
      icon = TrendingUpIcon;
    } else if (rateOfChangeCmPerHr < -EPSILON) {
      label = "Falling";
      color = COLORS.neutral;
      icon = TrendingDownIcon;
    } else {
      label = "Steady";
      color = COLORS.neutral;
      icon = TrendingFlatIcon;
    }

    const formattedValue = `${
      rateOfChangeCmPerHr > 0 ? "+" : ""
    }${rateOfChangeCmPerHr.toFixed(1)}`;
    rateOfChangeData = { value: formattedValue, label, color, icon };
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        River Water Level
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mb: 2,
        }}
        r
      >
        <MetricCard
          icon={WavesIcon}
          label="Water Level"
          value={latestReading.waterLevelM.toFixed(2)}
          unit="m"
          timeLabel={TimeUtils.getTimeAgoString(latestReading.timeUt)}
        />
        {rateOfChangeData && (
          <MetricCard
            icon={rateOfChangeData.icon}
            label="Rate of Rise/Drop"
            value={rateOfChangeData.value}
            unit="cm/hr"
            timeLabel=""
          />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <WaterLevelChart
          waterLevelHistory={waterLevelHistory}
          riverStation={place}
        />
      </Box>
    </Box>
  );
}
