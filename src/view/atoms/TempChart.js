import { LineChart } from "@mui/x-charts/LineChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function TempChart({ temp2mC24h, hourlyTimeUt }) {
  const xAxisData = hourlyTimeUt.map((time) => new Date(time * 1000));
  const yAxisData = temp2mC24h;

  const series = [
    {
      data: yAxisData,
      label: "Temperature (°C)",
      color: COLORS.neutral,
      showMark: false,
    },
  ];

  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          scaleType: "time",
          tickLabelStyle: {
            fontSize: 10,
          },
          valueFormatter: (date, context) => {
            if (context.location === "tick") {
              return TimeUtils.formatIImmp(date);
            } else {
              return TimeUtils.formatMMMDDIImmp(date);
            }
          },
        },
      ]}
      yAxis={[
        {
          label: "Temperature (°C)",
          valueFormatter: (value) => `${value.toFixed(1)} °C`,
          tickLabelStyle: {
            fontSize: 10,
          },
        },
      ]}
      series={series}
      height={360}
      margin={5}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
