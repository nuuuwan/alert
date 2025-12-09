import Chart from "./Chart";
import { LineChart } from "@mui/x-charts/LineChart";
export default function TempChart({ temp2mC24h, hourlyTimeUt }) {
  return (
    <Chart
      Chart={LineChart}
      data={temp2mC24h}
      timeData={hourlyTimeUt}
      yAxisLabel="Temperature (°C)"
    />
  );
}
