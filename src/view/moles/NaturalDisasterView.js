import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertScoreView from "./AlertScoreView";
import ScienceIcon from "@mui/icons-material/Science";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import InformationGroup from "../atoms/InformationGroup";
import CustomTab from "../atoms/CustomTab";
import CustomTabs from "../atoms/CustomTabs";
import { getAlertColor } from "../_cons/StyleConstants";
import CustomPaper from "../atoms/CustomPaper";

export default function NaturalDisasterView({ place }) {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const alertScoreList = place?.autoAlertList || [];

  return (
    <CustomPaper>
      <Box>
        {alertScoreList && alertScoreList.length > 0 ? (
          <>
            <CustomTabs
              value={tabValue}
              onChange={(event, newValue) => setTabValue(newValue)}
            >
              {alertScoreList.map((alertScore, iAlert) => {
                const score = alertScore.score;
                const maxScore = alertScore.maxScore;
                const alertColor = getAlertColor(score, maxScore);
                return (
                  <CustomTab
                    key={alertScore.name}
                    label={`${iAlert + 1}. ${t(alertScore.name)}`}
                    color={alertColor}
                  />
                );
              })}
            </CustomTabs>
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
      <Alert
        severity="warning"
        icon={<ScienceIcon />}
        sx={{ ml: 3, width: "fit-content", maxWidth: "90vw" }}
      >
        {t(
          "These alerts are automtically generated, and are still under development and should be used for informational purposes only.",
        )}
      </Alert>
    </CustomPaper>
  );
}
