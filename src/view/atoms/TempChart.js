import Chart from "./Chart";

export default function TempChart({ hourlyTemp, hourlyTimeUt }) {
  return (
    <Chart
      data={hourlyTemp.slice(6 * 24, 8 * 24)}
      timeData={hourlyTimeUt.slice(6 * 24, 8 * 24)}
      yAxisLabel="Temperature (°C)"
      chartType="line"
    />
  );
}
