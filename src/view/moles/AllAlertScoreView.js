import OldMetricCard from "../atoms/OldMetricCard";
import { useTranslation } from "react-i18next";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import InfoIcon from "@mui/icons-material/Info";
import TsunamiIcon from "@mui/icons-material/Tsunami";
import WaterIcon from "@mui/icons-material/Water";
import TerrainIcon from "@mui/icons-material/Terrain";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SpaIcon from "@mui/icons-material/Spa";
import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MetricCard from "../atoms/MetricCard";
import ScienceIcon from "@mui/icons-material/Science";
import Divider from "@mui/material/Divider";
import InformationGroup from "../atoms/InformationGroup";
import AlertScoreView from "./AlertScoreView";

export default function AllAlertScoreView({ iAlertScore, alertScore }) {
  const { t } = useTranslation();

  const score = alertScore.score;
  const maxScore = alertScore.maxScore;

  const Icon =
    {
      Tsunami: TsunamiIcon,
      Flood: WaterIcon,
      Landslide: TerrainIcon,
      Heat: WhatshotIcon,
      Drought: SpaIcon,
    }[alertScore.name] || InfoIcon;

  const alertLabel = NaturalDisaster.getLabel(score, maxScore);
  const alertColor = getAlertColor(score, maxScore);

  return (
    <InformationGroup
      Icon={ScienceIcon}
      title={`${iAlertScore + 1}. ${t(alertScore.name)} ${t("Alert Score")}`}
      dataSourceList={[]}
      InnerComponent={Box}
    >
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("Risk of the location experiencing a") +
            " " +
            t(alertScore.name) +
            " " +
            t("event.")}
        </Typography>
        <OldMetricCard
          label={t(alertScore.name)}
          Icon={Icon}
          value={`${score}/${maxScore}`}
          unit=""
          color={alertColor}
          timeLabel={t(alertScore.timeLabel)}
          alertLabel={alertLabel}
        />
        <Divider />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          <span style={{ fontWeight: "bold", color: alertColor }}>
            {score}/{maxScore}
          </span>
          {" " + t("of Contributing Factors are satisfied.")}
        </Typography>
        <Grid container spacing={0}>
          {alertScore.metricList.map((metric, index) => (
            <AlertScoreView key={index} metric={metric} />
          ))}
        </Grid>
      </Box>
    </InformationGroup>
  );
}
