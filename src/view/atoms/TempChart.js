import Chart from "./Chart";

export default function TempChart({ hourlyTempCelsius, hourlyTimeUt }) {
  return (
    <Chart
      data={hourlyTempCelsius}
      timeData={hourlyTimeUt}
      yAxisLabel="Temperature (°C)"
      chartType="line"
    />
  );
}
