import Chart from "./Chart";
import { BarChart } from "@mui/x-charts/BarChart";
export default function RainChart({ rainMM24h, hourlyTimeUt }) {
  return (
    <Chart
      Chart={BarChart}
      data={rainMM24h}
      timeData={hourlyTimeUt}
      yAxisLabel="Rainfall (mm)"
    />
  );
}
