import { COLORS } from "../_cons/StyleConstants";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";
export default function TempChart({
  tempListHourly,
  timeUtListHourly,
  latLng,
}) {
  const { t } = useTranslation();
  const tempListHourlyForChart = tempListHourly.slice(6 * 24, 8 * 24);
  const timeUtListHourlyForChart = timeUtListHourly.slice(6 * 24, 8 * 24);
  return (
    <Chart
      title="Temperature History & Forecast"
      data={tempListHourlyForChart}
      timeData={timeUtListHourlyForChart}
      yAxisLabel={`${t("Temperature")} (${t("°C")})`}
      chartType="line"
      color={COLORS.fire}
      yAxisMin={Math.min(...tempListHourlyForChart) - 1}
      yAxisMax={Math.max(...tempListHourlyForChart) + 1}
      latLng={latLng}
    />
  );
}
