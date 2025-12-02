import { useEffect, useState } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { RiverWaterLevel, Alert } from "../../nonview/core";
import { DATE_TIME_FORMAT } from "../_cons/FormatConstants";

export default function WaterLevelChart({ station }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const idx = await RiverWaterLevel.idx();
        const measurements = idx[station.name] || [];

        if (measurements.length > 0) {
          const chartData = measurements.map((m) => ({
            date: m.date,
            waterLevel: m.waterLevelM,
          }));
          setData(chartData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error loading water level history:", error);
        setData([]);
      }
      setLoading(false);
    }

    loadData();
  }, [station.name]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No historical data available
        </Typography>
      </Box>
    );
  }

  const dates = data.map((d) => d.date);
  const waterLevels = data.map((d) => d.waterLevel);

  // Create reference lines for flood levels
  const series = [
    {
      id: "waterLevel",
      data: waterLevels,
      label: "Water Level (m)",
      color: "#1976d2",
      showMark: false,
    },
  ];

  // Add major flood level line if available
  if (station.majorFloodLevelM && station.majorFloodLevelM > 0) {
    series.push({
      id: "majorFlood",
      data: dates.map(() => station.majorFloodLevelM),
      label: "Major Flood",
      color: Alert.MAJOR.colorRgb,
      showMark: false,
      curve: "linear",
    });
  }

  // Add minor flood level line if available
  if (station.minorFloodLevelM && station.minorFloodLevelM > 0) {
    series.push({
      id: "minorFlood",
      data: dates.map(() => station.minorFloodLevelM),
      label: "Minor Flood",
      color: Alert.MINOR.colorRgb,
      showMark: false,
      curve: "linear",
    });
  }

  // Add alert level line if available
  if (station.alertLevelM && station.alertLevelM > 0) {
    series.push({
      id: "alert",
      data: dates.map(() => station.alertLevelM),
      label: "Alert",
      color: Alert.ALERT.colorRgb,
      showMark: false,
      curve: "linear",
    });
  }

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Water Level History
      </Typography>
      <LineChart
        xAxis={[
          {
            data: dates,
            scaleType: "time",
            valueFormatter: (date) =>
              date.toLocaleString("en-US", DATE_TIME_FORMAT),
          },
        ]}
        series={series}
        height={375}
        margin={20}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          [`.${lineElementClasses.root}[data-series="majorFlood"]`]: {
            strokeDasharray: "3 3",
          },
          [`.${lineElementClasses.root}[data-series="minorFlood"]`]: {
            strokeDasharray: "3 3",
          },
          [`.${lineElementClasses.root}[data-series="alert"]`]: {
            strokeDasharray: "3 3",
          },
          ".MuiLineElement-series-majorFlood": {
            strokeDasharray: "3 3",
          },
          ".MuiLineElement-series-minorFlood": {
            strokeDasharray: "3 3",
          },
          ".MuiLineElement-series-alert": {
            strokeDasharray: "3 3",
          },
        }}
      />
    </Box>
  );
}
