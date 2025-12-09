import Chart from "./Chart";

export default function RainChart({ hourlyRain, hourlyTimeUt }) {
  return (
    <Chart
      data={hourlyRain}
      timeData={hourlyTimeUt}
      yAxisLabel="Rainfall (mm)"
      chartType="bar"
    />
  );
}
