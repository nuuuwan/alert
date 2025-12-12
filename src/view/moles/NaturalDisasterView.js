import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import FloodIcon from "@mui/icons-material/Flood";
import { getAlertColor } from "../_cons/StyleConstants";
import LandslideIcon from "@mui/icons-material/Landslide";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import InvertColorsOffIcon from "@mui/icons-material/InvertColorsOff";
import TsunamiIcon from "@mui/icons-material/Tsunami";
import Alert from "@mui/material/Alert";
import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import { useTranslation } from "react-i18next";

export default function NaturalDisasterView({ place }) {
  const { openMeteoData, openElevationData, earthquakeData } = place;
  const { t } = useTranslation();

  const {
    floodRiskData,
    landslideRiskData,
    heatRiskData,
    droughtRiskData,
    tsunamiRiskData,
  } = NaturalDisaster.getData({
    openMeteoData,
    openElevationData,
    earthquakeData,
  });

  return (
    <MetricCardCollection
      title={t("Natural Disasters")}
      sourceList={[
        ...OpenElevation.getSourceList(),
        ...OpenMeteo.getSourceList(place.latLng),
      ]}
    >
      <Alert severity="warning" sx={{ mb: 1 }}>
        {t(
          "These Natural Disaster Risk Metrics are still under development and should be used for informational purposes only."
        )}
      </Alert>
      <MetricCard
        Icon={FloodIcon}
        label="Flood"
        value={`${floodRiskData.floodRiskLevel}/${floodRiskData.floodRiskMaxLevel}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={NaturalDisaster.getLabel(
          floodRiskData.floodRiskLevel,
          floodRiskData.floodRiskMaxLevel
        )}
        color={getAlertColor(
          floodRiskData.floodRiskLevel,
          floodRiskData.floodRiskMaxLevel
        )}
      />
      <MetricCard
        Icon={LandslideIcon}
        label="Landslide"
        value={`${landslideRiskData.landslideRiskLevel}/${landslideRiskData.landslideRiskMaxLevel}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={NaturalDisaster.getLabel(
          landslideRiskData.landslideRiskLevel,
          landslideRiskData.landslideRiskMaxLevel
        )}
        color={getAlertColor(
          landslideRiskData.landslideRiskLevel,
          landslideRiskData.landslideRiskMaxLevel
        )}
      />

      <MetricCard
        Icon={DeviceThermostatIcon}
        label="Heat"
        value={`${heatRiskData.heatRiskLevel}/${heatRiskData.heatRiskMaxLevel}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={NaturalDisaster.getLabel(
          heatRiskData.heatRiskLevel,
          heatRiskData.heatRiskMaxLevel
        )}
        color={getAlertColor(
          heatRiskData.heatRiskLevel,
          heatRiskData.heatRiskMaxLevel
        )}
      />

      <MetricCard
        Icon={InvertColorsOffIcon}
        label="Drought"
        value={`${droughtRiskData.droughtRiskLevel}/${droughtRiskData.droughtRiskMaxLevel}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={NaturalDisaster.getLabel(
          droughtRiskData.droughtRiskLevel,
          droughtRiskData.droughtRiskMaxLevel
        )}
        color={getAlertColor(
          droughtRiskData.droughtRiskLevel,
          droughtRiskData.droughtRiskMaxLevel
        )}
      />

      <MetricCard
        Icon={TsunamiIcon}
        label="Tsunami"
        value={`${tsunamiRiskData.tsunamiRiskLevel}/${tsunamiRiskData.tsunamiRiskMaxLevel}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={NaturalDisaster.getLabel(
          tsunamiRiskData.tsunamiRiskLevel,
          tsunamiRiskData.tsunamiRiskMaxLevel
        )}
        color={getAlertColor(
          tsunamiRiskData.tsunamiRiskLevel,
          tsunamiRiskData.tsunamiRiskMaxLevel
        )}
      />
    </MetricCardCollection>
  );
}
