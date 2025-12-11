import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import FloodIcon from "../atoms/icons/FloodIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import LandslideIcon from "../atoms/icons/LandslideIcon";
import WarningIcon from "@mui/icons-material/Warning";
import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import OpenElevation from "../../nonview/core/third_party/OpenElevation";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";

export default function NaturalDisasterView({ place }) {
  const { openMeteoData, openElevationData } = place;

  const { floodRiskData, landslideRiskData, heatRiskData } =
    NaturalDisaster.getData({
      openMeteoData,
      openElevationData,
    });

  return (
    <MetricCardCollection
      title="Natural Disaster Risks"
      sourceList={[
        ...OpenElevation.getSourceList(),
        ...OpenMeteo.getSourceList(place.latLng),
      ]}
    >
      <MetricCard
        Icon={FloodIcon}
        label="Flood Risk"
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
        label="Landslide Risk"
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
        Icon={WarningIcon}
        label="Heat Risk"
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
        Icon={WarningIcon}
        label="Tsunami Risk"
        value="TODO"
        unit=""
        timeLabel="Coming Soon..."
        isPrediction
        alertLabel={""}
        color={COLORS.neutralLight}
      />

      <MetricCard
        Icon={WarningIcon}
        label="Drought Risk"
        value="TODO"
        unit=""
        timeLabel="Coming Soon..."
        isPrediction
        alertLabel={""}
        color={COLORS.neutralLight}
      />
    </MetricCardCollection>
  );
}
