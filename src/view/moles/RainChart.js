import { COLORS } from "../_cons/StyleConstants";
import Chart from "./Chart";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import { useTranslation } from "react-i18next";
export default function RainChart({
  rainListHourly,
  timeUtListHourly,
  latLng,
}) {
  const { t } = useTranslation();
  const rainListHourlyForChart = rainListHourly.slice(
    (OpenMeteo.SPAN_DAYS_BEFORE - 1) * 24,
    (OpenMeteo.SPAN_DAYS_BEFORE + 1) * 24
  );
  const timeUtListHourlyForChart = timeUtListHourly.slice(
    (OpenMeteo.SPAN_DAYS_BEFORE - 1) * 24,
    (OpenMeteo.SPAN_DAYS_BEFORE + 1) * 24
  );
  return (
    <Chart
      title="Rainfall History & Forecast"
      data={rainListHourlyForChart}
      timeData={timeUtListHourlyForChart}
      yAxisLabel={`${t("Rainfall")} (${t("mm")})`}
      chartType="bar"
      color={COLORS.water}
      yAxisMin={0}
      yAxisMax={Math.max(12.5, Math.max(...rainListHourlyForChart))}
      latLng={latLng}
    />
  );
}
