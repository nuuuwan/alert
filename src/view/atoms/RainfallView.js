import MetricView from "./MetricView";

export default function RainfallView({ rainMM }) {
  if (rainMM === null || rainMM === undefined) {
    return null;
  }

  // Determine color based on rainfall amount
  let color;
  let label;
  if (rainMM === 0) {
    color = "#9e9e9e"; // Gray - No rain
    label = "No Rain";
  } else if (rainMM < 50) {
    color = "#90caf9"; // Light blue - Light rain
    label = "Light Rain";
  } else if (rainMM < 100) {
    color = "#42a5f5"; // Blue - Moderate rain
    label = "Moderate Rain";
  } else if (rainMM < 200) {
    color = "#1976d2"; // Dark blue - Heavy rain
    label = "Heavy Rain";
  } else {
    color = "#7b1fa2"; // Purple - Very heavy rain
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
