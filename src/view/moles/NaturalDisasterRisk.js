import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import FloodIcon from "../atoms/icons/FloodIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import LandslideIcon from "../atoms/icons/LandslideIcon";
import WarningIcon from "@mui/icons-material/Warning";

export default function NaturalDisasterRisk({ place }) {
  const { openMeteoData } = place;

  return (
    <MetricCardCollection title="Natural Disaster Risks" sourceList={[]}>
      <MetricCard
        Icon={FloodIcon}
        label="Flood Risk"
        value={`${openMeteoData.floodRiskScore}/${openMeteoData.floodRiskScoreTotal}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={openMeteoData.floodRiskLabel}
        color={getAlertColor(openMeteoData.floodRiskAlertLevel)}
      />
      <MetricCard
        Icon={LandslideIcon}
        label="Landslide Risk"
        value={`${openMeteoData.landslideRiskScore}/${openMeteoData.landslideRiskScoreTotal}`}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={openMeteoData.landslideRiskLabel}
        color={getAlertColor(openMeteoData.landslideRiskAlertLevel)}
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
        label="Extreme Heat Risk"
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
