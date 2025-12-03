import MetricView from "./MetricView";
import { WEATHER_COLORS } from "../_cons/StyleConstants";

export default function RainfallView({ rainMM }) {
  if (rainMM === null || rainMM === undefined) {
    return null;
  }

  // Determine color based on rainfall amount
  let color;
  let label;
  if (rainMM === 0) {
    color = WEATHER_COLORS.rain.none;
    label = "No Rain";
  } else if (rainMM < 50) {
    color = WEATHER_COLORS.rain.light;
    label = "Light Rain";
  } else if (rainMM < 100) {
    color = WEATHER_COLORS.rain.moderate;
    label = "Moderate Rain";
  } else if (rainMM < 200) {
    color = WEATHER_COLORS.rain.heavy;
    label = "Heavy Rain";
  } else {
    color = WEATHER_COLORS.rain.veryHeavy;
    label = "Very Heavy Rain";
  }

  return (
    <MetricView
      label="Rainfall"
      value={rainMM.toFixed(1)}
      unit="mm"
      badge={label}
      badgeColor={color}
      valueVariant="h3"
      unitVariant="h6"
    />
  );
}
