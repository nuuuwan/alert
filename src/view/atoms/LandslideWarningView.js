import MetricCard from "./MetricCard";
import TimeUtils from "../../nonview/base/TimeUtils";
export default function LandslideWarningView({ level, timeUt }) {
  if (level == null) return null;

  let title = "Landslide Warning";
  let value = "No Warning";
  let color = "default";

  if (level === 1) {
    value = "Level 1: Watch";
    color = "low";
  } else if (level === 2) {
    value = "Level 2: Alert";
    color = "medium";
  } else if (level === 3) {
    value = "Level 3: Evacuate";
    color = "high";
  }

  return (
    <MetricCard
      label={title}
      value={value}
      unit={""}
      color={color}
      timeLabel={TimeUtils.getTimeAgoString(timeUt)}
    />
  );
}
