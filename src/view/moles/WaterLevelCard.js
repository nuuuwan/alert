import OldMetricCard from "../atoms/OldMetricCard";
import WaterIcon from "@mui/icons-material/Water";
import { getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import CustomPaper from "../atoms/CustomPaper";

export default function WaterLevelCard({ hydrometricStation }) {
  const level = hydrometricStation.waterLevelAlertLevel;
  const waterLevelM = hydrometricStation.latestWaterLevelM;
  const timeUt = hydrometricStation.latestWaterLevelTimeUt;

  let alertLabel = level > 0 ? `Level ${level}` : "No Alert";
  if (level === 1) {
    alertLabel = "Alert Level";
  } else if (level === 2) {
    alertLabel = "Minor Flood";
  } else if (level === 3) {
    alertLabel = "Major Flood";
  }

  const color = getAlertColor(level, 3);

  return (
    <CustomPaper>
      <OldMetricCard
        Icon={WaterIcon}
        label="Water Level"
        value={waterLevelM !== undefined ? waterLevelM.toFixed(2) : "N/A"}
        unit="m"
        color={color}
        timeLabel={TimeUtils.getTimeAgoString(timeUt)}
        alertLabel={alertLabel}
      />
    </CustomPaper>
  );
}
