import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useTranslation } from "react-i18next";
import {
  getExperimentalAlerts,
  getOfficialAlerts,
} from "../../nonview/core/AlertSummary";
import { COLORS, getAlertMeta } from "../_cons/StyleConstants";
import SummaryAlertSection from "./SummaryAlertSection";

export default function SummaryView({ place, onViewDetails }) {
  const { t } = useTranslation();
  const officialAlerts = getOfficialAlerts(place);
  const experimentalAlerts = getExperimentalAlerts(place);
  const isSafe = (place.officialAlertLevel || 0) === 0;
  const alertMeta = getAlertMeta(isSafe ? 0 : place.officialAlertLevel);
  const StatusIcon = isSafe
    ? CheckCircleOutlineIcon
    : ReportProblemOutlinedIcon;

  return (
    <Stack spacing={2} sx={{ p: 1.5 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderTop: "4px solid",
          borderTopColor: alertMeta.color,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 64,
              height: 64,
              flexShrink: 0,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: COLORS.brandLight,
            }}
          >
            <StatusIcon sx={{ fontSize: 42, color: alertMeta.color }} />
          </Box>
          <Box>
            <Typography variant="overline" color="text.secondary">
              {t("Safety summary")}
            </Typography>
            <Typography variant="h1" sx={{ color: alertMeta.color }}>
              {t(isSafe ? "Safe" : "Not safe")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("Based on official alerts only.")}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <SummaryAlertSection
        title="Official Alerts"
        alerts={officialAlerts}
        official
      />
      <SummaryAlertSection
        title="Experimental alerts"
        alerts={experimentalAlerts}
      />

      <Button
        variant="contained"
        fullWidth
        endIcon={<ArrowForwardIcon />}
        onClick={onViewDetails}
      >
        {t("View detailed alerts")}
      </Button>
    </Stack>
  );
}
