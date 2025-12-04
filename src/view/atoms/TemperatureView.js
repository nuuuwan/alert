import MetricView from "./MetricView";
import { WEATHER_COLORS, COLORS } from "../_cons/StyleConstants";

export default function TemperatureView({ tempMin, tempMax, isStale = false }) {
  if (
    (tempMin === null || tempMin === undefined) &&
    (tempMax === null || tempMax === undefined)
  ) {
    return null;
  }

  // Determine color based on max temperature
  const getColor = (temp) => {
    if (temp === null || temp === undefined) return COLORS.grayMedium;
    if (temp >= 35) return WEATHER_COLORS.temperature.extremeHot;
    if (temp >= 30) return WEATHER_COLORS.temperature.veryHot;
    if (temp >= 25) return WEATHER_COLORS.temperature.hot;
    if (temp >= 20) return WEATHER_COLORS.temperature.warm;
    if (temp >= 15) return WEATHER_COLORS.temperature.pleasant;
    if (temp >= 10) return WEATHER_COLORS.temperature.cool;
    return WEATHER_COLORS.temperature.cold;
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
      isStale={isStale}
    />
  );
}
