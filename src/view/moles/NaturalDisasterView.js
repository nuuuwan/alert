import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import AlertScoreView from "./AlertScoreView";
import ScienceIcon from "@mui/icons-material/Science";
import CustomTabs from "../atoms/CustomTabs";
import { getAlertColor } from "../_cons/StyleConstants";
import Box from "@mui/material/Box";

export default function NaturalDisasterView({ place }) {
  const { t } = useTranslation();

  const alertScoreList = place?.autoAlertList || [];

  const tabToChild = Object.fromEntries(
    alertScoreList.map(function (alertScore) {
      const childGenerator = () => {
        return <AlertScoreView alertScore={alertScore} place={place} />;
      };
      return [alertScore.name, childGenerator];
    }),
  );

  const tabToColor = Object.fromEntries(
    alertScoreList.map(function (alertScore) {
      return [alertScore.name, getAlertColor(alertScore.level)];
    }),
  );

  const tabToNAlerts = Object.fromEntries(
    alertScoreList.map(function (alertScore) {
      return [alertScore.name, alertScore.level > 0 ? 1 : 0];
    }),
  );

  return (
    <Box>
      <Alert
        severity="warning"
        icon={<ScienceIcon />}
        sx={{ m: 1, maxWidth: "480px" }}
      >
        {t(
          "These alerts are automtically generated, and are still under development and should be used for informational purposes only.",
        )}
      </Alert>
      <CustomTabs
        tabToChild={tabToChild}
        tabToColor={tabToColor}
        tabToNAlerts={tabToNAlerts}
      />
    </Box>
  );
}
