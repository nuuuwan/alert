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

  return (
    <CustomTabs
      tabToChild={{
        Landslides: () => <LandslideCard dsd={place.dsd} />,
        "Water Level": () => <WaterLevelCard hydrometricStation={place} />,
      }}
      tabToColor={{
        Landslides: getAlertColor(place.dsd.latestLandslideWarningLevel, 3),
        "Water Level":
          place instanceof HydrometricStation
            ? getAlertColor(place.waterLevelAlertLevel, 3)
            : undefined,
      }}
      tabToNAlerts={{
        Landslides:
          place.dsd.latestLandslideWarningLevel &&
          place.dsd.latestLandslideWarningLevel > 0
            ? 1
            : 0,
        "Water Level":
          place instanceof HydrometricStation &&
          place.waterLevelAlertLevel &&
          place.waterLevelAlertLevel > 0
            ? 1
            : 0,
      }}
    />
  );
}
