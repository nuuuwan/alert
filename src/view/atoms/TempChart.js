import { COLORS } from "../_cons/StyleConstants";
import Chart from "./Chart";

export default function TempChart({ hourlyTemp, hourlyTimeUt }) {
  const hourlyTempForChart = hourlyTemp.slice(6 * 24, 8 * 24);
  const hourlyTimeUtForChart = hourlyTimeUt.slice(6 * 24, 8 * 24);
  return (
    <Chart
      data={hourlyTempForChart}
      timeData={hourlyTimeUtForChart}
      yAxisLabel="Temperature (°C)"
      chartType="line"
      color={COLORS.fire}
      yAxisMin={Math.min(...hourlyTempForChart) - 1}
      yAxisMax={Math.max(...hourlyTempForChart) + 1}
    />
  );
}
