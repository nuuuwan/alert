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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
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
      <Table>
        <TableBody>
          {alertScore.metricList.map((metric, index) => {
            const isConditionMet = metric.condition(metric.value);
            const StatusIcon = isConditionMet ? CheckCircleIcon : CancelIcon;

            return (
              <TableRow key={index}>
                <TableCell>
                  <MetricCard
                    timedUnitValue={metric.timedUnitValue}
                    timeLabel={t(metric.timeLabel)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {t(metric.conditionDescription)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: 50, textAlign: "center" }}>
                  {StatusIcon && <StatusIcon />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </CustomPaper>
  );
}
