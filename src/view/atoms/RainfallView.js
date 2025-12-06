import MetricView from "./MetricView";
import { COLORS } from "../_cons/StyleConstants";

export default function RainfallView({ rainMM, isStale = false }) {
  if (rainMM === null || rainMM === undefined) {
    return null;
  }

  // Determine color based on rainfall amount
  let color;
  let label;
  if (rainMM === 0) {
    color = COLORS.neutral;
    label = "No Rain";
  } else if (rainMM < 50) {
    color = COLORS.neutral;
    label = "Light Rain";
  } else if (rainMM < 100) {
    color = COLORS.lowAlert;
    label = "Moderate Rain";
  } else if (rainMM < 200) {
    color = COLORS.mediumAlert;
    label = "Heavy Rain";
  } else {
    color = COLORS.highAlert;
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
      isStale={isStale}
    />
  );
}
