import OldMetricCard from "../atoms/OldMetricCard";
import InformationGroup from "../atoms/InformationGroup";
import LandslideIcon from "@mui/icons-material/Landslide";
import WaterIcon from "@mui/icons-material/Water";
import { getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DataSource from "../../nonview/core/DataSource";
import { CircularProgress } from "@mui/material";

export default function NaturalDisasterOfficialView({ place }) {
  let landslideCard;
  let waterLevelCard;
  if (place) {
    const dsd = place && place.dsd;
    const isHydrometricStation = place instanceof HydrometricStation;

    landslideCard =
      dsd && dsd.latestLandslideWarningLevel !== undefined
        ? getLandslideCard(dsd)
        : null;
    waterLevelCard = isHydrometricStation ? getWaterLevelCard(place) : null;
  }

  return (
    <InformationGroup
      title="Official Alerts"
      dataSourceList={[
        new DataSource({
          label: "Disaster Management Centre of Sri Lanka",
          url: "https://www.dmc.gov.lk",
        }),
        new DataSource({
          label:
            "Hydrology and Disaster Management Division, Irrigation Deptartment of Sri Lanka",
          url: "https://github.com/nuuuwan/lk_irrigation",
        }),
      ]}
    >
      {landslideCard || waterLevelCard ? (
        <>
          {landslideCard}
          {waterLevelCard}
        </>
      ) : (
        <CircularProgress />
      )}
    </InformationGroup>
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
    <OldMetricCard
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
    <OldMetricCard
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
