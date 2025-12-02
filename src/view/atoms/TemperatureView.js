import MetricView from "./MetricView";

export default function TemperatureView({ tempMin, tempMax }) {
  if (
    (tempMin === null || tempMin === undefined) &&
    (tempMax === null || tempMax === undefined)
  ) {
    return null;
  }

  // Determine color based on max temperature
  const getColor = (temp) => {
    if (temp === null || temp === undefined) return "#757575";
    if (temp >= 35) return "#b71c1c"; // Dark red - Extreme heat
    if (temp >= 30) return "#d32f2f"; // Red - Very hot
    if (temp >= 25) return "#f57c00"; // Orange - Hot
    if (temp >= 20) return "#ffa726"; // Light orange - Warm
    if (temp >= 15) return "#66bb6a"; // Green - Pleasant
    if (temp >= 10) return "#42a5f5"; // Blue - Cool
    return "#1976d2"; // Dark blue - Cold
  };

  // Determine label based on max temperature
  const getLabel = (temp) => {
    if (temp === null || temp === undefined) return "";
    if (temp >= 35) return "Very Hot";
    if (temp >= 30) return "Hot";
    if (temp >= 25) return "Warm";
    if (temp >= 20) return "Pleasant";
    if (temp >= 15) return "Cool";
    if (temp >= 10) return "Cool";
    return "Cold";
  };

  const tempMid = (tempMin + tempMax) / 2;
  const maxColor = getColor(tempMid);
  const label = getLabel(tempMid);

  // Build temperature display string
  let tempValue = "";
  if (tempMin !== null && tempMin !== undefined) {
    tempValue += tempMin.toFixed(1);
    if (tempMax !== null && tempMax !== undefined) {
      tempValue += " / ";
    }
  }
  if (tempMax !== null && tempMax !== undefined) {
    tempValue += tempMax.toFixed(1);
  }

  return (
    <MetricView
      label="Temperature (Min / Max)"
      value={tempValue}
      unit="°C"
      badge={label}
      badgeColor={maxColor}
      valueVariant="h4"
      unitVariant="h6"
    />
  );
}
