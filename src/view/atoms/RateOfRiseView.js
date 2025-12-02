import MetricView from "./MetricView";

export default function RateOfRiseView({ rateOfChangeCmPerHr, label, color }) {
  if (!label) return null;

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
