import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "../../../../nonview/core/Alert";

import {
  DATE_TIME_FORMAT,
  SHORT_DATE_TIME_FORMAT,
} from "../../../_cons/FormatConstants";
import { CHART_COLORS } from "../../../_cons/StyleConstants";

const CHART_WINDOW_DAYS = 7;

export default function WaterLevelChart({ station, measurements }) {
  if (!measurements || measurements.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No historical data available
        </Typography>
      </Box>
    );
  }

  const dates = measurements.map((d) => d.getDate());
  const waterLevels = measurements.map((d) => d.waterLevelM);

  const series = [
    {
      id: "waterLevel",
      data: waterLevels,
      label: "Water Level (m)",
      color: CHART_COLORS.waterLevel,
      showMark: false,
    },
  ];

  const alertLevels = [
    {
      id: "majorFlood",
      levelM: station.majorFloodLevelM,
      alert: Alert.MAJOR,
    },
    {
      id: "minorFlood",
      levelM: station.minorFloodLevelM,
      alert: Alert.MINOR,
    },
    {
      id: "alert",
      levelM: station.alertLevelM,
      alert: Alert.ALERT,
    },
  ];

  alertLevels.forEach(({ id, levelM, alert }) => {
    if (levelM && levelM > 0) {
      series.push({
        id,
        data: dates.map(() => levelM),
        label: alert.label,
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
            label: "Time",
            data: dates,
            dataKey: "timeAxis",
            scaleType: "time",
            tickLabelStyle: {
              fontSize: 12,
            },
            tickNumber: 6,
            valueFormatter: (date, context) => {
              if (context?.location === "tooltip") {
                return date.toLocaleString("en-US", DATE_TIME_FORMAT);
              }
              return date.toLocaleString("en-US", SHORT_DATE_TIME_FORMAT);
            },
          },
        ]}
        yAxis={[
          {
            label: "Water Level (m)",
            valueFormatter: (value) => `${value.toFixed(1)}m`,
          },
        ]}
        series={series}
        height={450}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          ".MuiLineElement-series-majorFlood": {
            strokeDasharray: "3 3",
          },
          ".MuiLineElement-series-minorFlood": {
            strokeDasharray: "3 3",
          },
          ".MuiLineElement-series-alert": {
            strokeDasharray: "3 3",
          },
          "& .MuiChartsAxis-tickLabel": { fill: "currentColor" },
        }}
      />
    </Box>
  );
}
