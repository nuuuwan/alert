import { LineChart } from "@mui/x-charts/LineChart";
import { COLORS } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import MetricCardCollection from "./MetricCardCollection";

const DASHED_STYLE = {
  strokeDasharray: "5 5",
};

export default function WaterLevelChart({
  waterLevelHistory,
  HydrometricStation,
}) {
  const chartData = [...waterLevelHistory].reverse().slice(-168); // Last 7 days
  const xAxisData = chartData.map((d) => new Date(d.timeUt * 1000));
  const yAxisData = chartData.map((d) => d.waterLevelM);

  const series = [
    {
      data: yAxisData,
      label: "Water Level",
      color: COLORS.water,
      showMark: false,
    },
  ];

  const floodLevels = [
    {
      level: HydrometricStation.alertLevelM,
      label: "Alert Level",
      color: COLORS.lowAlert,
    },
    {
      level: HydrometricStation.minorFloodLevelM,
      label: "Minor Flood Level",
      color: COLORS.mediumAlert,
    },
    {
      level: HydrometricStation.majorFloodLevelM,
      label: "Major Flood Level",
      color: COLORS.highAlert,
    },
  ];

  floodLevels.forEach(({ level, label, color }) => {
    if (level) {
      series.push({
        data: Array(xAxisData.length).fill(level),
        label,
        color,
        showMark: false,
        style: DASHED_STYLE,
      });
    }
  });

  return (
    <MetricCardCollection
      title="Water Level History"
      sourceList={[
        {
          label:
            "Hydrology and Disaster Management Division, Irrigation Deptartment of Sri Lanka",
          url: "https://github.com/nuuuwan/lk_irrigation",
        },
      ]}
    >
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
                return TimeUtils.formatMMMDD(date);
              } else {
                return TimeUtils.formatMMMDDIImmp(date);
              }
            },
          },
        ]}
        yAxis={[
          {
            label: "Water Level (m)",
            valueFormatter: (value) => `${value.toFixed(0)}m`,
          },
        ]}
        series={series}
        margin={5}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          "& .MuiLineElement-series-auto-generated-id-1": {
            strokeDasharray: "5 5",
          },
          "& .MuiLineElement-series-auto-generated-id-2": {
            strokeDasharray: "5 5",
          },
          "& .MuiLineElement-series-auto-generated-id-3": {
            strokeDasharray: "5 5",
          },
          width: { xs: "80vw", md: "calc(80vw - 80vh)" },
          height: { xs: "calc(80vw * 9/16)", md: "calc((80vw - 80vh) * 9/16)" },
        }}
      />
    </MetricCardCollection>
  );
}
