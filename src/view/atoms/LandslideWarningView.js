import MetricCard from "./MetricCard";
import TimeUtils from "../../nonview/base/TimeUtils";
import WarningIcon from "@mui/icons-material/Warning";
import { getAlertColor } from "../_cons/StyleConstants";

export default function LandslideWarningView({ level, timeUt }) {
  if (level === null) {
    throw new Error("level is null");
  }

  let value = "No Warning";
  let alertLabel = `Level ${level}`;
  if (level === 1) {
    value = "Watch";
  } else if (level === 2) {
    value = "Alert";
  } else if (level === 3) {
    value = "Evacuate";
  }
  const color = getAlertColor(level, 3);

  return (
    <MetricCard
      Icon={WarningIcon}
      label="Landslide Alert"
      value={value}
      unit=""
      color={color}
      timeLabel={TimeUtils.getTimeAgoString(timeUt)}
      alertLabel={alertLabel}
    />
  );
}
