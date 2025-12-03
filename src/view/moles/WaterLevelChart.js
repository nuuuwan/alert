import { useEffect, useState } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { RiverWaterLevel, Alert } from "../../nonview/core";
import {
  DATE_TIME_FORMAT,
  SHORT_DATE_TIME_FORMAT,
} from "../_cons/FormatConstants";

const CHART_WINDOW_DAYS = 7;

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
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - CHART_WINDOW_DAYS);

          const recentMeasurements = measurements.filter(
            (m) => m.date >= cutoffDate
          );

          const chartData = recentMeasurements.map((m) => ({
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

  // Add alert level reference lines
  const alertLevels = [
    {
      id: "majorFlood",
      levelM: station.majorFloodLevelM,
      alert: Alert.MAJOR,
      label: "Major Flood",
    },
    {
      id: "minorFlood",
      levelM: station.minorFloodLevelM,
      alert: Alert.MINOR,
      label: "Minor Flood",
    },
    {
      id: "alert",
      levelM: station.alertLevelM,
      alert: Alert.ALERT,
      label: "Alert",
    },
  ];

  alertLevels.forEach(({ id, levelM, alert, label }) => {
    if (levelM && levelM > 0) {
      series.push({
        id,
        data: dates.map(() => levelM),
        label,
        color: alert.colorRgb,
        showMark: false,
        curve: "linear",
      });
    }
  });

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Water Level History (Last {CHART_WINDOW_DAYS} Days)
      </Typography>
      <LineChart
        xAxis={[
          {
            data: dates,
            scaleType: "time",
            valueFormatter: (date, context) => {
              if (context?.location === "tooltip") {
                return date.toLocaleString("en-US", DATE_TIME_FORMAT);
              }
              return date.toLocaleString("en-US", SHORT_DATE_TIME_FORMAT);
            },
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
