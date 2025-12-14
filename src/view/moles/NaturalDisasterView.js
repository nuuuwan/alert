import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertScoreView from "./AlertScoreView";

export default function NaturalDisasterView({ place }) {
  const { openMeteoData, openElevationData, earthquakeData } = place;
  const { t } = useTranslation();

  const landslideScore = NaturalDisaster.getLandslideRiskScore({
    openMeteoData,
    openElevationData,
  });
  const floodScore = NaturalDisaster.getFloodRiskScore({
    openMeteoData,
    openElevationData,
  });
  const tsunamiScore = NaturalDisaster.getTsunamiRiskScore({ earthquakeData });
  const droughtScore = OpenMeteo.getDroughtRiskScore({ openMeteoData });
  const heatScore = OpenMeteo.getHeatRiskScore({ openMeteoData });

  return (
    <Box>
      <Alert
        severity="warning"
        sx={{ ml: 3, width: "fit-content", maxWidth: 400 }}
      >
        {t(
          "These Natural Disaster Risk Metrics are still under development and should be used for informational purposes only."
        )}
      </Alert>
      <Box>
        <AlertScoreView alertScore={landslideScore} />
        <AlertScoreView alertScore={floodScore} />
        <AlertScoreView alertScore={tsunamiScore} />
        <AlertScoreView alertScore={droughtScore} />
        <AlertScoreView alertScore={heatScore} />
      </Box>
    </Box>
  );
}
