import Chart from "./Chart";

export default function RainChart({ hourlyPrecipitationMM, hourlyTimeUt }) {
  return (
    <Chart
      data={hourlyPrecipitationMM}
      timeData={hourlyTimeUt}
      yAxisLabel="Rainfall (mm)"
      chartType="bar"
    />
  );
}
