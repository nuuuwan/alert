import OldMetricCard from "../atoms/OldMetricCard";
import LandslideIcon from "@mui/icons-material/Landslide";
import WaterIcon from "@mui/icons-material/Water";
import { getAlertColor } from "../_cons/StyleConstants";
import TimeUtils from "../../nonview/base/TimeUtils";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DataSource from "../../nonview/core/DataSource";
import { CircularProgress } from "@mui/material";
import DataSourceView from "../atoms/DataSourceView";
import CustomPaper from "../atoms/CustomPaper";
import { useState } from "react";
import Box from "@mui/material/Box";
import CustomTabs from "../atoms/CustomTabs";
import CustomTab from "../atoms/CustomTab";
import { useTranslation } from "react-i18next";

export default function NaturalDisasterOfficialView({ place }) {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  if (!place) {
    return <CircularProgress />;
  }

  const landslideCard = getLandslideCard(place.dsd);
  const waterLevelCard =
    place instanceof HydrometricStation ? getWaterLevelCard(place) : null;

  const tabs = [];
  if (landslideCard) {
    const level = place.dsd.latestLandslideWarningLevel;
    const color = getAlertColor(level, 3);
    tabs.push({
      label: t("Landslide"),
      card: landslideCard,
      color,
    });
  }
  if (waterLevelCard) {
    const level = place.waterLevelAlertLevel;
    const color = getAlertColor(level, 3);
    tabs.push({
      label: t("Water Level"),
      card: waterLevelCard,
      color,
    });
  }

  let dataSourceList = [];
  if (landslideCard) {
    dataSourceList.push(
      new DataSource({
        label: "Disaster Management Centre of Sri Lanka",
        url: "https://www.dmc.gov.lk",
      })
    );
  }

  if (waterLevelCard) {
    dataSourceList.push(
      new DataSource({
        label:
          "Hydrology and Disaster Management Division, Irrigation Deptartment of Sri Lanka",
        url: "https://github.com/nuuuwan/lk_irrigation",
      })
    );
  }

  if (tabs.length === 0) {
    return (
      <CustomPaper>
        <DataSourceView dataSourceList={dataSourceList} />
      </CustomPaper>
    );
  }

  return (
    <CustomPaper>
      <Box>
        <CustomTabs
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
        >
          {tabs.map((tab, index) => (
            <CustomTab
              key={tab.label}
              label={`${index + 1}. ${tab.label}`}
              color={tab.color}
            />
          ))}
        </CustomTabs>
        <Box sx={{ mt: 2 }}>{tabs[tabValue]?.card}</Box>
      </Box>
      <DataSourceView dataSourceList={dataSourceList} />
    </CustomPaper>
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
