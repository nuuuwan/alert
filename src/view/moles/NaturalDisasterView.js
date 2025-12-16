import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AllAlertScoreView from "./AllAlertScoreView";
import ScienceIcon from "@mui/icons-material/Science";
import { CircularProgress } from "@mui/material";

export default function NaturalDisasterView({ place }) {
  const { t } = useTranslation();

  let alertScoreList = [];

  if (place) {
    const { openMeteoData, openElevationData, earthquakeData } = place;
    alertScoreList = [
      NaturalDisaster.getLandslideRiskScore({
        openMeteoData,
        openElevationData,
      }),
      NaturalDisaster.getFloodRiskScore({
        openMeteoData,
        openElevationData,
      }),
      NaturalDisaster.getTsunamiRiskScore({ earthquakeData }),
      OpenMeteo.getDroughtRiskScore({ openMeteoData }),
      OpenMeteo.getHeatRiskScore({ openMeteoData }),
    ];
  }

  return (
    <Box>
      <Alert
        severity="warning"
        icon={<ScienceIcon />}
        sx={{ ml: 3, width: "fit-content", maxWidth: 320 }}
      >
        {t(
          "The following Natural Disaster Risk Scores are still under development and should be used for informational purposes only."
        )}
      </Alert>
      <Box>
        {alertScoreList ? (
          alertScoreList.map((alertScore, iAlertScore) => (
            <Box key={alertScore.name} sx={{ mt: 2 }}>
              <AllAlertScoreView
                iAlertScore={iAlertScore}
                alertScore={alertScore}
              />
            </Box>
          ))
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
}
