import { getAlertColor } from "../_cons/StyleConstants";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DataSource from "../../nonview/core/DataSource";
import { CircularProgress } from "@mui/material";
import DataSourceView from "../atoms/DataSourceView";
import CustomTabs from "../atoms/CustomTabs";
import LandslideCard from "./LandslideCard";
import WaterLevelCard from "./WaterLevelCard";

export default function NaturalDisasterOfficialView({ place }) {
  if (!place) {
    return <CircularProgress />;
  }

  const hasLandslide = place.dsd.latestLandslideWarningLevel !== null;
  const hasWaterLevel = place instanceof HydrometricStation;

  let dataSourceList = [];
  if (hasLandslide) {
    dataSourceList.push(
      new DataSource({
        label: "Disaster Management Centre of Sri Lanka",
        url: "https://www.dmc.gov.lk",
      }),
    );
  }

  if (hasWaterLevel) {
    dataSourceList.push(
      new DataSource({
        label:
          "Hydrology and Disaster Management Division, Irrigation Deptartment of Sri Lanka",
        url: "https://github.com/nuuuwan/lk_irrigation",
      }),
    );
  }

  if (!hasLandslide && !hasWaterLevel) {
    return <DataSourceView dataSourceList={dataSourceList} />;
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
