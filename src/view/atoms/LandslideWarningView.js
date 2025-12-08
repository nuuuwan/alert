import MetricCard from "./MetricCard";
import TimeUtils from "../../nonview/base/TimeUtils";
import WarningIcon from "@mui/icons-material/Warning";
import { getAlertColor } from "../_cons/StyleConstants";

export default function LandslideWarningView({ level, timeUt }) {
  if (level == null) return null;

  let value = "No Warning";
  if (level === 1) {
    value = "Level 1: Watch";
  } else if (level === 2) {
    value = "Level 2: Alert";
  } else if (level === 3) {
    value = "Level 3: Evacuate";
  }
  const color = getAlertColor(level);

  return (
    <MetricCard
      Icon={WarningIcon}
      label="Landslide Warning"
      value={value}
      unit={""}
      color={color}
      timeLabel={TimeUtils.getTimeAgoString(timeUt)}
    />
  );
}
