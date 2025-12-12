import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import LandslideIcon from "@mui/icons-material/Landslide";
import WaterIcon from "@mui/icons-material/Water";
import { getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";

export default function NaturalDisasterOfficialView({ place }) {
  const dsd = place.dsd;
  const isHydrometricStation = place instanceof HydrometricStation;

  const landslideCard =
    dsd && dsd.latestLandslideWarningLevel !== undefined
      ? getLandslideCard(dsd)
      : null;
  const waterLevelCard =
    isHydrometricStation && place.alertLevel > 0
      ? getWaterLevelCard(place)
      : null;

  if (!landslideCard && !waterLevelCard) {
    return null;
  }

  return (
    <MetricCardCollection
      title="Official Alerts"
      sourceList={[
        {
          label: "Disaster Management Centre of Sri Lanka",
          url: "https://www.dmc.gov.lk",
        },
        {
          label:
            "Hydrology and Disaster Management Division, Irrigation Deptartment of Sri Lanka",
          url: "https://github.com/nuuuwan/lk_irrigation",
        },
      ]}
    >
      {landslideCard}
      {waterLevelCard}
    </MetricCardCollection>
  );
}

function getLandslideCard(dsd) {
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
    <MetricCard
      Icon={LandslideIcon}
      label="Landslide"
      value={value}
      unit=""
      color={color}
      timeLabel={TimeUtils.getTimeAgoString(timeUt)}
      alertLabel={alertLabel}
    />
  );
}

function getWaterLevelCard(hydrometricStation) {
  const level = hydrometricStation.alertLevel;
  const waterLevelM = hydrometricStation.latestWaterLevelM;
  const timeUt = hydrometricStation.latestWaterLevelTimeUt;

  let alertLabel = level > 0 ? `Level ${level}` : "Safe";
  if (level === 1) {
    alertLabel = "Alert Level";
  } else if (level === 2) {
    alertLabel = "Minor Flood";
  } else if (level === 3) {
    alertLabel = "Major Flood";
  }

  const color = getAlertColor(level, 3);

  return (
    <MetricCard
      Icon={WaterIcon}
      label="Water Level"
      value={waterLevelM !== undefined ? waterLevelM.toFixed(2) : "N/A"}
      unit="m"
      color={color}
      timeLabel={TimeUtils.getTimeAgoString(timeUt)}
      alertLabel={alertLabel}
    />
  );
}
