import Chart from "./Chart";

export default function RainChart({ hourlyRain, hourlyTimeUt }) {
  return (
    <Chart
      data={hourlyRain.slice(6 * 24, 8 * 24)}
      timeData={hourlyTimeUt.slice(6 * 24, 8 * 24)}
      yAxisLabel="Rainfall (mm)"
      chartType="bar"
    />
  );
}
