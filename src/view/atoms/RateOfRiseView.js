import MetricView from "./MetricView";

export default function RateOfRiseView({ waterLevelDiff, timeDiffHours }) {
  if (timeDiffHours === undefined || timeDiffHours <= 0) return null;

  const rateOfChangeCmPerHr = (waterLevelDiff / timeDiffHours) * 100;

  let label = null;
  let color = null;

  if (rateOfChangeCmPerHr > 0.01) {
    label = "Rising";
    color = "rgb(211, 47, 47)"; // red
  } else if (rateOfChangeCmPerHr < -0.01) {
    label = "Falling";
    color = "rgb(46, 125, 50)"; // green
  } else {
    label = "Steady";
    color = "rgb(117, 117, 117)"; // grey
  }

  const formattedValue = `${
    rateOfChangeCmPerHr > 0 ? "+" : ""
  }${rateOfChangeCmPerHr.toFixed(0)}`;

  return (
    <MetricView
      label="Rate of Change"
      value={formattedValue}
      unit="cm/hr"
      badge={label}
      badgeColor={color}
      valueVariant="h5"
      unitVariant="body2"
    />
  );
}
