import Chart from "./Chart";

export default function RainChart({ rainMM24h, hourlyTimeUt }) {
  return (
    <Chart
      data={rainMM24h}
      timeData={hourlyTimeUt}
      yAxisLabel="Rainfall (mm)"
      chartType="bar"
    />
  );
}
