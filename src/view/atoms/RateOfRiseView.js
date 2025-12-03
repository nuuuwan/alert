import MetricView from "./MetricView";
import { COLORS } from "../_cons/StyleConstants";

export default function RateOfRiseView({ waterLevelDiff, timeDiffHours }) {
  if (timeDiffHours === undefined || timeDiffHours <= 0) return null;

  const rateOfChangeCmPerHr = (waterLevelDiff / timeDiffHours) * 100;

  let label = null;
  let color = null;

  if (rateOfChangeCmPerHr > 0.01) {
    label = "Rising";
    color = COLORS.redAlert;
  } else if (rateOfChangeCmPerHr < -0.01) {
    label = "Falling";
    color = COLORS.greenDark;
  } else {
    label = "Steady";
    color = COLORS.gray;
  }

  const formattedValue = `${
    rateOfChangeCmPerHr > 0 ? "+" : ""
  }${rateOfChangeCmPerHr.toFixed(1)}`;

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
