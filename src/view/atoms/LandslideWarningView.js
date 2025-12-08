import MetricCard from "./MetricCard";
import TimeUtils from "../../nonview/base/TimeUtils";
import WarningIcon from "@mui/icons-material/Warning";
import { getAlertColor } from "../_cons/StyleConstants";

export default function LandslideWarningView({ level, timeUt }) {
  if (level == null) return null;

  let value = "No Warning";
  let unit = "";
  if (level === 1) {
    value = "Watch";
    unit = "Level 1";
  } else if (level === 2) {
    value = "Alert";
    unit = "Level 2";
  } else if (level === 3) {
    value = "Evacuate";
    unit = "Level 3";
  }
  const color = getAlertColor(level);

  return (
    <MetricCard
      Icon={WarningIcon}
      label="Landslide Warning"
      value={value}
      unit={unit}
      color={color}
      timeLabel={TimeUtils.getTimeAgoString(timeUt)}
    />
  );
}
