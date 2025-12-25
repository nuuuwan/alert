import OldMetricCard from "../atoms/OldMetricCard";
import LandslideIcon from "@mui/icons-material/Landslide";
import { getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import CustomPaper from "../atoms/CustomPaper";
import DataSourceView from "../atoms/DataSourceView";

export default function LandslideCard({ dsd }) {
  const level = dsd.latestLandslideWarningLevel;
  if (level === null) {
    return null;
  }

  const timeUt = dsd.latestLandslideWarningTimeUt;
  let value = "Safe";
  let alertLabel = level > 0 ? `Level ${level}` : "No Alert";
  if (level === 1) {
    value = "Watch";
  } else if (level === 2) {
    value = "Alert";
  } else if (level === 3) {
    value = "Evacuate";
  }

  const color = getAlertColor(level, 3);

  return (
    <CustomPaper>
      <OldMetricCard
        Icon={LandslideIcon}
        label="Landslide"
        value={value}
        unit=""
        color={color}
        timeLabel={TimeUtils.getTimeAgoString(timeUt)}
        alertLabel={alertLabel}
      />
      <DataSourceView dataSourceList={[dsd.landslideAlertDataSource]} />
    </CustomPaper>
  );
}
