import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isAlertColor, COLORS } from "../_cons/StyleConstants";

import { useTranslation } from "react-i18next";

export default function MetricCard({ timedUnitValue, alertLabel }) {
  const { t } = useTranslation();
  const unitValue = timedUnitValue.unitValue;

  let color = unitValue.constructor.getColor();
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
        borderRadius: 2,
        backgroundColor: backColor,
        border: "2px solid",
        borderColor: foreColor,
        textAlign: "center",
        width: 120,
        height: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden", // Ensure content does not overflow
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
          variant="h5"
          color={foreColor}
          fontWeight={"bold"}
          noWrap
          sx={{ fontSize: Math.min(24, 180 / t(valueFormatted).length) }}
        >
          {t(valueFormatted)}
        </Typography>
        <Typography
          variant="caption"
          color={foreColor}
          sx={{ ml: 0.5, position: "relative", bottom: "4px" }}
          noWrap
        >
          {unitLabel}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          color={foreColor}
          sx={{ opacity: 0.6 }}
          noWrap
        >
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
