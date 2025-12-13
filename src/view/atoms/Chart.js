import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis, ChartsYAxis } from "@mui/x-charts";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { BarPlot } from "@mui/x-charts/BarChart";
import CustomPaper from "./CustomPaper";

export default function Chart({
  data,
  timeData,
  yAxisLabel,
  chartType,
  color,
  yAxisMin,
  yAxisMax,
}) {
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
      color,
      showMark: false,
      type: chartType,
    },
    {
      data: predictedData,
      label: "Future (Predicted)",
      color,
      showMark: false,
      type: chartType,
    },
  ];

  const Plot = chartType === "line" ? LinePlot : BarPlot;

  return (
    <CustomPaper>
      <ChartContainer
        sx={{
          width: { xs: "80vw", md: "calc(80vw - 80vh)" },
          height: { xs: "calc(80vw * 9/16)", md: "calc((80vw - 80vh) * 9/16)" },
        }}
        xAxis={[
          {
            data: xAxisData,
            scaleType: "band",
            min: xAxisData[0],
            max: xAxisData[xAxisData.length - 1],
            tickLabelStyle: {
              fontSize: 10,
            },
            tickInterval: (value, index) => {
              return index % 3 === 0;
            },
            valueFormatter: (date, context) => {
              return TimeUtils.formatIImmp(date);
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
            min: yAxisMin,
            max: yAxisMax,
          },
        ]}
        series={series}
        grid={{ vertical: true, horizontal: true }}
        margin={10}
      >
        <Plot />
        <ChartsReferenceLine
          x={nowPoint}
          label={TimeUtils.formatMMMDDIImmp(nowPoint)}
          lineStyle={{ stroke: COLORS.neutral, strokeDasharray: "4 4" }}
        />

        <ChartsXAxis />
        <ChartsYAxis />
      </ChartContainer>
    </CustomPaper>
  );
}
