import Chart from "./Chart";

export default function TempChart({ hourlyTemp, hourlyTimeUt }) {
  return (
    <Chart
      data={hourlyTemp}
      timeData={hourlyTimeUt}
      yAxisLabel="Temperature (°C)"
      chartType="line"
    />
  );
}
