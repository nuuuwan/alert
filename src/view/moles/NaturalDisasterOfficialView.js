import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import LandslideIcon from "@mui/icons-material/Landslide";
import { getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import { useTranslation } from "react-i18next";

export default function NaturalDisasterOfficialView({ place }) {
  const { t } = useTranslation();
  const dsd = place.dsd;
  if (!dsd || dsd.latestLandslideWarningLevel === undefined) {
    return null;
  }

  const level = dsd.latestLandslideWarningLevel;
  const timeUt = dsd.latestLandslideWarningTimeUt;

  if (level === null) {
    return null;
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
    <MetricCardCollection
      title="Official Natural Disaster Warnings"
      sourceList={[
        {
          label: "Disaster Management Centre of Sri Lanka",
          url: "https://www.dmc.gov.lk",
        },
      ]}
    >
      <MetricCard
        Icon={LandslideIcon}
        label="Landslide"
        value={value}
        unit=""
        color={color}
        timeLabel={TimeUtils.getTimeAgoString(timeUt)}
        alertLabel={alertLabel}
      />
    </MetricCardCollection>
  );
}
