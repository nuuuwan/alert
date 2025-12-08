import { LineChart } from "@mui/x-charts/LineChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function TempChart({ temp2mC24h, hourlyTimeUt }) {
  const currentTime = Date.now();
  const xAxisData = hourlyTimeUt.map((time) => new Date(time * 1000));

  const observedData = hourlyTimeUt.map((time, index) =>
    time * 1000 <= currentTime ? temp2mC24h[index] : null
  );
  const predictedData = hourlyTimeUt.map((time, index) =>
    time * 1000 > currentTime ? temp2mC24h[index] : null
  );

  const series = [
    {
      data: observedData,
      label: "Observed Temperature (°C)",
      color: COLORS.neutral,
      showMark: false,
    },
    {
      data: predictedData,
      label: "Predicted Temperature (°C)",
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
      sx={{
        "& .MuiLineElement-series-auto-generated-id-1": {
          strokeDasharray: "5 5",
        },
        "& .MuiLegendItem-root[data-series='Predicted Temperature (°C)'] .MuiLegendItem-label": {
          strokeDasharray: "5 5",
        },
      }}
    />
  );
}
