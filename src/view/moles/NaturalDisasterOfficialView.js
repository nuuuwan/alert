import { getAlertColor } from "../_cons/StyleConstants";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import { CircularProgress } from "@mui/material";
import CustomTabs from "../atoms/CustomTabs";
import LandslideCard from "./LandslideCard";
import WaterLevelCard from "./WaterLevelCard";

export default function NaturalDisasterOfficialView({ place }) {
  if (!place) {
    return <CircularProgress />;
  }

  const isHydrometricStation = place instanceof HydrometricStation;

  let tabToChild = {
    Landslides: () => <LandslideCard dsd={place.dsd} />,
  };
  let tabToColor = {
    Landslides: getAlertColor(place.dsd.latestLandslideWarningLevel, 3),
  };
  let tabToNAlerts = {
    Landslides:
      place.dsd.latestLandslideWarningLevel &&
      place.dsd.latestLandslideWarningLevel > 0
        ? 1
        : 0,
  };

  if (isHydrometricStation) {
    tabToChild["Water Level"] = () => (
      <WaterLevelCard hydrometricStation={place} />
    );
    tabToColor["Water Level"] = getAlertColor(place.waterLevelAlertLevel, 3);
    tabToNAlerts["Water Level"] =
      place.waterLevelAlertLevel && place.waterLevelAlertLevel > 0 ? 1 : 0;
  }

  return (
    <CustomTabs
      tabToChild={tabToChild}
      tabToColor={tabToColor}
      tabToNAlerts={tabToNAlerts}
    />
  );
}
