import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis, ChartsYAxis } from "@mui/x-charts";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

export default function Chart({ data, timeData, yAxisLabel }) {
  const currentTime = Date.now();
  const xAxisData = timeData.map((time) => new Date(time * 1000));

  const observedData = timeData.map((time, index) =>
    time * 1000 <= currentTime ? data[index] : null
  );
  const predictedData = timeData.map((time, index) =>
    time * 1000 > currentTime ? data[index] : null
  );

  const nowPoint =
    xAxisData.find((date) => date.getTime() >= currentTime) ||
    new Date(currentTime);

  const series = [
    {
      data: observedData,
      label: "Past (Observed)",
      color: COLORS.neutral,
      showMark: false,
      type: "line",
    },
    {
      data: predictedData,
      label: "Future (Predicted)",
      color: COLORS.neutralLight,
      showMark: false,
      type: "line",
    },
  ];

  return (
    <ChartContainer
      xAxis={[
        {
          data: xAxisData,
          scaleType: "band",
          min: xAxisData[0],
          max: xAxisData[xAxisData.length - 1],
          tickLabelStyle: {
            fontSize: 10,
          },
          valueFormatter: (date, context) => {
            return TimeUtils.formatMMMDDIImmp(date);
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
    >
      <LinePlot />
      <ChartsReferenceLine
        x={nowPoint}
        label="Now"
        lineStyle={{ stroke: "red", strokeDasharray: "4 4" }}
      />

      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
}
