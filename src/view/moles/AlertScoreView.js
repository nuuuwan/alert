import MetricCard from "../atoms/MetricCard";
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
import MetricCardCollection from "../atoms/MetricCardCollection";
import Typography from "@mui/material/Typography";

export default function AlertScoreView({ alertScore }) {
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
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t(alertScore.name)} {t("Alert Score")}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {t(alertScore.description)}
      </Typography>
      <MetricCard
        label={t(alertScore.name)}
        Icon={Icon}
        value={`${score}/${maxScore}`}
        unit=""
        color={getAlertColor(score, maxScore)}
        timeLabel={t(alertScore.timeLabel)}
        alertLabel={alertLabel}
      />
    </CustomPaper>
  );
}
