import MetricView from "./MetricView";

export default function WaterLevelView({ waterLevelM, alert }) {
  return (
    <MetricView
      label="Water Level"
      value={waterLevelM.toFixed(2)}
      unit="m"
      badge={alert.label}
      badgeColor={alert.colorRgb}
      valueVariant="h3"
      unitVariant="h6"
    />
  );
}
