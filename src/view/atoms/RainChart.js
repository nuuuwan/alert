import { LineChart } from "@mui/x-charts/LineChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function RainChart({ rainMM24h, hourlyTimeUt }) {
  const currentTime = Date.now();
  const xAxisData = hourlyTimeUt.map((time) => new Date(time * 1000));

  const observedData = hourlyTimeUt.map((time, index) =>
    time * 1000 <= currentTime ? rainMM24h[index] : null,
  );
  const predictedData = hourlyTimeUt.map((time, index) =>
    time * 1000 > currentTime ? rainMM24h[index] : null,
  );

  const series = [
    {
      data: observedData,
      label: "Observed Rainfall (mm)",
      color: COLORS.neutral,
      showMark: false,
    },
    {
      data: predictedData,
      label: "Predicted Rainfall (mm)",
      color: COLORS.neutralLight,
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
      sx={{
        "& .MuiLineElement-series-auto-generated-id-1": {
          strokeDasharray: "5 5",
        },
        "& .MuiLegendItem-root[data-series='Predicted Rainfall (mm)'] .MuiLegendItem-label":
          {
            strokeDasharray: "5 5",
          },
      }}
    />
  );
}
