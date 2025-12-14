import { COLORS } from "../_cons/StyleConstants";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";
export default function RainChart({ hourlyRain, hourlyTimeUt, latLng }) {
  const { t } = useTranslation();
  const hourlyRainForChart = hourlyRain.slice(6 * 24, 8 * 24);
  const hourlyTimeUtForChart = hourlyTimeUt.slice(6 * 24, 8 * 24);
  return (
    <Chart
      title="Rainfall History & Forecast"
      data={hourlyRainForChart}
      timeData={hourlyTimeUtForChart}
      yAxisLabel={`${t("Rainfall")} (${t("mm")})`}
      chartType="bar"
      color={COLORS.water}
      yAxisMin={0}
      yAxisMax={Math.max(12.5, Math.max(...hourlyRainForChart))}
      latLng={latLng}
    />
  );
}
