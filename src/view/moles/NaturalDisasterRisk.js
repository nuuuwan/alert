import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import FloodIcon from "../atoms/icons/FloodIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import LandslideIcon from "../atoms/icons/LandslideIcon";
import WarningIcon from "@mui/icons-material/Warning";
import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";

export default function NaturalDisasterRisk({ place }) {
  const { openMeteoData, openElevationData } = place;

  const { floodRiskData, landslideRiskData } = NaturalDisaster.getData({
    openMeteoData,
    openElevationData,
  });

  return (
    <MetricCardCollection title="Natural Disaster Risks" sourceList={[]}>
      <MetricCard
        Icon={FloodIcon}
        label="Flood Risk"
        value={`${floodRiskData.floodRiskLevel}/${floodRiskData.floodRiskMaxLevel}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={NaturalDisaster.getLabel(
          floodRiskData.floodRiskLabelLevel,
          floodRiskData.floodRiskMaxLevel
        )}
        color={getAlertColor(
          floodRiskData.floodRiskAlertLevel,
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
          landslideRiskData.landslideRiskLabelLevel,
          landslideRiskData.landslideRiskMaxLevel
        )}
        color={getAlertColor(
          landslideRiskData.landslideRiskAlertLevel,
          landslideRiskData.landslideRiskMaxLevel
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
        label="Heat Risk"
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
