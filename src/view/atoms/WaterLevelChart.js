import { LineChart } from "@mui/x-charts/LineChart";
import { CHART_COLORS } from "../_cons/StyleConstants";

export default function WaterLevelChart({ waterLevelHistory }) {
  const chartData = [...waterLevelHistory].reverse().slice(-168); // Last 7 days
  const xAxisData = chartData.map((d) => new Date(d.timeUt * 1000));
  const yAxisData = chartData.map((d) => d.waterLevelM);

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
  );
}
