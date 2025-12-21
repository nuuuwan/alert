import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isAlertColor, COLORS } from "../_cons/StyleConstants";

import { useTranslation } from "react-i18next";

export default function MetricCard({
  timedUnitValue,
  alertLabel,
  colorOverride,
}) {
  const { t } = useTranslation();
  const unitValue = timedUnitValue.unitValue;

  const color = colorOverride || unitValue.constructor.getColor();
  let foreColor = color || COLORS.neutral;
  let backColor = "white";
  if (isAlertColor(color)) {
    foreColor = "white";
    backColor = color;
  }

  const Icon = unitValue.constructor.getIcon();
  const label = unitValue.constructor.getLabel();
  const valueFormatted = unitValue.format();
  const unitLabel = unitValue.constructor.getUnitLabel();

  const timeLabel = timedUnitValue.timeLabel;

  return (
    <Box
      sx={{
        p: 0.5,
        m: 0.5,
        borderRadius: 1,
        backgroundColor: backColor,
        border: "1px solid",
        borderColor: foreColor,
        textAlign: "center",
        width: 90,
        height: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.1,
          overflow: "hidden", // Prevent overflow in this section
        }}
      >
        {Icon && (
          <Icon fontSize="small" sx={{ color: foreColor }} color={foreColor} />
        )}
        <Typography
          variant="caption"
          color={foreColor}
          noWrap
          sx={{ fontSize: Math.min(12, 180 / t(label).length) }}
        >
          {t(label)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden", // Prevent overflow in this section
        }}
      >
        <Typography
          variant="h6"
          color={foreColor}
          sx={{ fontSize: Math.min(24, 180 / t(valueFormatted).length) }}
        >
          {t(valueFormatted)}
        </Typography>
        <Typography
          variant="caption"
          color={foreColor}
          sx={{ ml: 0.1, position: "relative", bottom: "4px" }}
          noWrap
        >
          {t(unitLabel)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color={foreColor} noWrap>
          {t(timeLabel)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" color={foreColor} noWrap>
          {t(alertLabel)}
        </Typography>
      </Box>
    </Box>
  );
}
