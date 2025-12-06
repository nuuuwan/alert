import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { LineChart } from "@mui/x-charts/LineChart";
import WavesIcon from "@mui/icons-material/Waves";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import MetricCard from "../atoms/MetricCard";
import { COLORS, CHART_COLORS } from "../_cons/StyleConstants";

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

  // Latest is first (descending order)
  const latestReading = waterLevelHistory[0];
  const previousReading = waterLevelHistory[1];

  // Calculate rate of rise
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
      color = COLORS.redAlert;
      icon = TrendingUpIcon;
    } else if (rateOfChangeCmPerHr < -EPSILON) {
      label = "Falling";
      color = COLORS.greenDark;
      icon = TrendingDownIcon;
    } else {
      label = "Steady";
      color = COLORS.gray;
      icon = TrendingFlatIcon;
    }

    const formattedValue = `${
      rateOfChangeCmPerHr > 0 ? "+" : ""
    }${rateOfChangeCmPerHr.toFixed(1)}`;
    rateOfChangeData = { value: formattedValue, label, color, icon };
  }

  // Prepare chart data (reverse to show oldest to newest)
  const chartData = [...waterLevelHistory].reverse().slice(-168); // Last 7 days
  const xAxisData = chartData.map((d) => new Date(d.timeUt * 1000));
  const yAxisData = chartData.map((d) => d.waterLevelM);

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
      >
        <MetricCard
          icon={WavesIcon}
          label="Water Level"
          value={latestReading.waterLevelM.toFixed(2)}
          unit="m"
        />
        {rateOfChangeData && (
          <MetricCard
            icon={rateOfChangeData.icon}
            label="Rate of Rise/Drop"
            value={rateOfChangeData.value}
            unit="cm/hr"
          />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <LineChart
          xAxis={[
            {
              data: xAxisData,
              scaleType: "time",
              tickLabelStyle: {
                angle: 45,
                textAnchor: "start",
                fontSize: 10,
              },
            },
          ]}
          yAxis={[
            {
              label: "Water Level (m)",
              valueFormatter: (value) => `${value.toFixed(2)}m`,
            },
          ]}
          series={[
            {
              data: yAxisData,
              label: "Water Level",
              color: CHART_COLORS.waterLevel,
              showMark: false,
            },
          ]}
          height={480}
          margin={5}
        />
      </Box>
    </Box>
  );
}
