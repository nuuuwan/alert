import { LineChart } from "@mui/x-charts/LineChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function RainChart({ rainMM24h, hourlyTimeUt }) {
  const xAxisData = hourlyTimeUt.map((time) => new Date(time * 1000));
  const yAxisData = rainMM24h;

  const series = [
    {
      data: yAxisData,
      label: "Rainfall (mm)",
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
          label: "Rainfall (mm)",
          valueFormatter: (value) => `${value.toFixed(1)} mm`,
          tickLabelStyle: {
            fontSize: 10,
          },
        },
      ]}
      series={series}
      height={360}
      margin={10}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
