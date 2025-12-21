import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import AlertScoreView from "./AlertScoreView";
import ScienceIcon from "@mui/icons-material/Science";
import CustomTabs from "../atoms/CustomTabs";
import CustomPaper from "../atoms/CustomPaper";
import { getAlertColor } from "../_cons/StyleConstants";

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

  return (
    <CustomPaper>
      <CustomTabs tabToChild={tabToChild} tabToColor={tabToColor} />
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
