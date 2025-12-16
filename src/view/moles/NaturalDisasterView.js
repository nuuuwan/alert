import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import OpenMeteo from "../../nonview/core/third_party/OpenMeteo";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertScoreView from "./AlertScoreView";
import ScienceIcon from "@mui/icons-material/Science";
import { CircularProgress, Tabs } from "@mui/material";
import { useState } from "react";
import InformationGroup from "../atoms/InformationGroup";
import CustomTab from "../atoms/CustomTab";

export default function NaturalDisasterView({ place }) {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

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
    <InformationGroup
      title="Auto Alerts (Experimental)"
      Icon={ScienceIcon}
      InnerComponent={Box}
    >
      <Alert
        severity="warning"
        icon={<ScienceIcon />}
        sx={{ ml: 3, width: "fit-content", maxWidth: "90vw" }}
      >
        {t(
          "The following Natural Disaster Risk Scores are automtically generated, and are still under development and should be used for informational purposes only.",
        )}
      </Alert>
      <Box>
        {alertScoreList && alertScoreList.length > 0 ? (
          <>
            <Tabs
              value={tabValue}
              onChange={(event, newValue) => setTabValue(newValue)}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
            >
              {alertScoreList.map((alertScore, iAlert) => (
                <CustomTab
                  key={alertScore.name}
                  label={`${iAlert + 1}. ${t(alertScore.name)}`}
                />
              ))}
            </Tabs>
            <Box sx={{ mt: 2 }}>
              <AlertScoreView
                iAlertScore={tabValue}
                alertScore={alertScoreList[tabValue]}
              />
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </InformationGroup>
  );
}
