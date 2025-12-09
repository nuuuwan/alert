import { LineChart } from "@mui/x-charts/LineChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function Chart({ data, timeData, yAxisLabel }) {
  const currentTime = Date.now();
  const xAxisData = timeData.map((time) => new Date(time * 1000));

  const observedData = timeData.map((time, index) =>
    time * 1000 <= currentTime ? data[index] : null
  );
  const predictedData = timeData.map((time, index) =>
    time * 1000 > currentTime ? data[index] : null
  );

  const series = [
    {
      data: observedData,
      label: "Past (Observed)",
      color: COLORS.neutral,
      showMark: false,
    },
    {
      data: predictedData,
      label: "Future (Predicted)",
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
          min: xAxisData[0], // Ensure the chart starts at the first data point
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
          label: yAxisLabel,
          valueFormatter: (value) => `${value.toFixed(1)}`,
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
        [`& .MuiLegendItem-root[data-series='Future (Predicted)'] .MuiLegendItem-label`]:
          {
            strokeDasharray: "5 5",
          },
      }}
    />
  );
}
