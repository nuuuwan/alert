import { COLORS } from "../_cons/StyleConstants";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";
export default function TempChart({ hourlyTemp, hourlyTimeUt }) {
  const { t } = useTranslation();
  const hourlyTempForChart = hourlyTemp.slice(6 * 24, 8 * 24);
  const hourlyTimeUtForChart = hourlyTimeUt.slice(6 * 24, 8 * 24);
  return (
    <Chart
      data={hourlyTempForChart}
      timeData={hourlyTimeUtForChart}
      yAxisLabel={`${t("Temperature")} (${t("°C")})`}
      chartType="line"
      color={COLORS.fire}
      yAxisMin={Math.min(...hourlyTempForChart) - 1}
      yAxisMax={Math.max(...hourlyTempForChart) + 1}
    />
  );
}
