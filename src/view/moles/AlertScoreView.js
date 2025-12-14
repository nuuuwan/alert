import OldMetricCard from "../atoms/OldMetricCard";
import CustomPaper from "../atoms/CustomPaper";
import { useTranslation } from "react-i18next";
import { getAlertColor } from "../_cons/StyleConstants";
import InfoIcon from "@mui/icons-material/Info";
import TsunamiIcon from "@mui/icons-material/Tsunami";
import WaterIcon from "@mui/icons-material/Water";
import TerrainIcon from "@mui/icons-material/Terrain";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SpaIcon from "@mui/icons-material/Spa";
import NaturalDisaster from "../../nonview/core/third_party/NaturalDisaster";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MetricCard from "../atoms/MetricCard";
import ScienceIcon from "@mui/icons-material/Science";

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
        color={getAlertColor(score, maxScore)}
        timeLabel={t(alertScore.timeLabel)}
        alertLabel={alertLabel}
      />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {alertScore.metricList.map((metric, index) => {
          const isConditionMet = metric.condition(metric.value);
          const StatusIcon = isConditionMet ? CheckCircleIcon : CancelIcon;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 1,
                }}
              >
                <MetricCard
                  timedUnitValue={metric.timedUnitValue}
                  timeLabel={t(metric.timeLabel)}
                />
                <Typography variant="body2">
                  {t(metric.conditionDescription)}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {StatusIcon && (
                    <StatusIcon
                      sx={{ color: isConditionMet ? "#4caf50" : "#f44336" }}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </CustomPaper>
  );
}
