import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import FloodIcon from "../atoms/icons/FloodIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import LandslideIcon from "../atoms/icons/LandslideIcon";
import WarningIcon from "@mui/icons-material/Warning";

export default function NaturalDisasterRisk({ place }) {
  const { openMeteoData } = place;

  return (
    <MetricCardCollection title="Natural Disaster Risks">
      <MetricCard
        Icon={FloodIcon}
        label="Flood Risk"
        value={openMeteoData.floodRiskScore.toFixed(1)}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={
          openMeteoData.floodRiskAlertLevel > 0
            ? `Level ${openMeteoData.floodRiskAlertLevel}`
            : ""
        }
        color={getAlertColor(openMeteoData.floodRiskAlertLevel)}
      />
      <MetricCard
        Icon={LandslideIcon}
        label="Landslide Risk"
        value={openMeteoData.landslideRiskScore.toFixed(1)}
        unit=""
        timeLabel="Next 24h"
        isPrediction
        alertLabel={
          openMeteoData.landslideRiskAlertLevel > 0
            ? `Level ${openMeteoData.landslideRiskAlertLevel}`
            : ""
        }
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
