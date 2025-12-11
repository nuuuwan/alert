import { COLORS } from "../_cons/StyleConstants";
import Chart from "./Chart";

export default function RainChart({ hourlyRain, hourlyTimeUt }) {
  const hourlyRainForChart = hourlyRain.slice(6 * 24, 8 * 24);
  const hourlyTimeUtForChart = hourlyTimeUt.slice(6 * 24, 8 * 24);
  return (
    <Chart
      data={hourlyRainForChart}
      timeData={hourlyTimeUtForChart}
      yAxisLabel="Rainfall (mm)"
      chartType="bar"
      color={COLORS.water}
      yAxisMin={0}
      yAxisMax={Math.max(12.5, Math.max(...hourlyRainForChart))}
    />
  );
}
