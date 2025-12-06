import { LineChart } from "@mui/x-charts/LineChart";
import { CHART_COLORS, COLORS } from "../_cons/StyleConstants";

export default function WaterLevelChart({ waterLevelHistory, riverStation }) {
  const chartData = [...waterLevelHistory].reverse().slice(-168); // Last 7 days
  const xAxisData = chartData.map((d) => new Date(d.timeUt * 1000));
  const yAxisData = chartData.map((d) => d.waterLevelM);

  const series = [
    {
      data: yAxisData,
      label: "Water Level",
      color: CHART_COLORS.waterLevel,
      showMark: false,
    },
  ];

  // Add reference lines for flood levels
  if (riverStation.alertLevelM) {
    series.push({
      data: Array(xAxisData.length).fill(riverStation.alertLevelM),
      label: "Alert Level",
      color: COLORS.orange,
      showMark: false,
    });
  }

  if (riverStation.minorFloodLevelM) {
    series.push({
      data: Array(xAxisData.length).fill(riverStation.minorFloodLevelM),
      label: "Minor Flood Level",
      color: COLORS.redAlert,
      showMark: false,
    });
  }

  if (riverStation.majorFloodLevelM) {
    series.push({
      data: Array(xAxisData.length).fill(riverStation.majorFloodLevelM),
      label: "Major Flood Level",
      color: COLORS.redDark,
      showMark: false,
    });
  }

  return (
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
      series={series}
      height={480}
      margin={5}
    />
  );
}
