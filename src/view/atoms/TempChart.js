import Chart from "./Chart";

export default function TempChart({ temp2mC24h, hourlyTimeUt }) {
  return (
    <Chart
      data={temp2mC24h}
      timeData={hourlyTimeUt}
      yAxisLabel="Temperature (°C)"
    />
  );
}
