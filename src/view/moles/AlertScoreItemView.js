import { useTranslation } from "react-i18next";
import { COLORS } from "../_cons/StyleConstants";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MetricCard from "../atoms/MetricCard";

export default function AlertScoreItemView({ metric }) {
  const { t } = useTranslation();

  const isConditionMet = metric.condition(metric.value);
  const statusColor = isConditionMet ? COLORS.highAlert : COLORS.noAlert;

  const isConditionMetDescription = isConditionMet ? t("Yes") : t("No");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MetricCard
        timedUnitValue={metric.timedUnitValue}
        timeLabel={t(metric.timeLabel)}
        colorOverride={statusColor}
      />
      <Typography variant="caption" color={statusColor}>
        {metric.conditionDescription}
        {t(metric.timedUnitValue.unitValue.constructor.getUnitLabel())}
      </Typography>
      <Typography variant="caption" color={statusColor}>
        {isConditionMetDescription}
      </Typography>
    </Box>
  );
}
