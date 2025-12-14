import MetricCard from "../atoms/MetricCard";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
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
      <Table>
        <TableBody>
          {alertScore.metricList.map((metric, index) => {
            const isConditionMet = metric.condition(metric.value);
            const StatusIcon = isConditionMet ? CheckCircleIcon : CancelIcon;
            const statusColor = isConditionMet
              ? COLORS.highAlert
              : COLORS.noAlert;

            return (
              <TableRow key={index}>
                <TableCell sx={{ width: 50, textAlign: "center" }}>
                  <StatusIcon sx={{ color: statusColor }} />
                </TableCell>
                <TableCell>
                  <MetricCard
                    label={t(metric.name)}
                    value={metric.value}
                    unit={metric.unit}
                    color={getAlertColor(isConditionMet ? 1 : 0, 1)}
                    timeLabel={t(metric.timeLabel)}
                    unit={t(metric.unit)}
                  />
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t(metric.description)}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {t(metric.conditionDescription)}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </CustomPaper>
  );
}
