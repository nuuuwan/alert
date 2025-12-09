import MetricCard from "../atoms/MetricCard";
import MetricCardCollection from "../atoms/MetricCardCollection";
import FloodIcon from "../atoms/icons/FloodIcon";
import { getAlertColor } from "../_cons/StyleConstants";
import LandslideIcon from "../atoms/icons/LandslideIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NaturalDisasterRisk({ place }) {
  const { openMeteoData } = place;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Natural Disaster Risk
      </Typography>

      <MetricCardCollection>
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
      </MetricCardCollection>
    </Box>
  );
}
