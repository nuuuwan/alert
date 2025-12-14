import OldMetricCard from "../atoms/OldMetricCard";
import CustomPaper from "../atoms/CustomPaper";
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

export default function AlertScoreView({ iAlertScore, alertScore }) {
  const { t } = useTranslation();

  if (!alertScore) {
    return null;
  }

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
    <CustomPaper>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <ScienceIcon />
        <Typography variant="h6">
          A{iAlertScore + 1}. {t(alertScore.name)} {t("Alert Score")}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {t(alertScore.description)}
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
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        <span style={{ fontWeight: "bold", color: alertColor }}>
          {score}/{maxScore}
        </span>
        {t(" of Contributing Factors are satisfied.")}
      </Typography>
      <Grid container spacing={0} sx={{ mt: 1 }}>
        {alertScore.metricList.map((metric, index) => {
          const isConditionMet = metric.condition(metric.value);
          const statusColor = isConditionMet
            ? COLORS.highAlert
            : COLORS.noAlert;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  p: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MetricCard
                  timedUnitValue={metric.timedUnitValue}
                  timeLabel={t(metric.timeLabel)}
                  colorOverride={statusColor}
                />
                <Typography
                  variant="caption"
                  sx={{ textDecoration: !isConditionMet ? "line-through" : "" }}
                  color={statusColor}
                >
                  {t(metric.conditionDescription)}?
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </CustomPaper>
  );
}
