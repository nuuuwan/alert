import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useTranslation } from "react-i18next";
import AlertSeverityChip from "../atoms/AlertSeverityChip";
import DataMeta from "../atoms/DataMeta";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";

const SUMMARY_BY_LEVEL = [
  "No active alerts are currently reported for this location.",
  "Stay aware and continue to monitor local conditions.",
  "Conditions require caution. Review the active alerts below.",
  "High-risk conditions are reported. Follow official local guidance now.",
];

export default function AlertOverview({ place }) {
  const { t } = useTranslation();
  const officialHazards = [];
  const officialSources = [];
  const officialTimes = [];

  if (place.dsd?.latestLandslideWarningLevel > 0) {
    officialHazards.push("Landslide");
    officialSources.push(place.dsd.landslideAlertDataSource);
    officialTimes.push(place.dsd.latestLandslideWarningTimeUt);
  }
  if (place instanceof HydrometricStation && place.waterLevelAlertLevel > 0) {
    officialHazards.push("Flood");
    officialSources.push(HydrometricStation.getWaterLevelAlertDataSource());
    officialTimes.push(place.latestWaterLevelTimeUt);
  }

  const automaticHazards = (place.autoAlertList || [])
    .filter((alert) => alert.level > 0)
    .map((alert) => alert.name);
  const hazards = [...new Set([...officialHazards, ...automaticHazards])];
  const level = Math.max(0, Math.min(3, place.alertLevel || 0));
  const latestOfficialTime = officialTimes.filter(Number.isFinite).length
    ? Math.max(...officialTimes.filter(Number.isFinite))
    : undefined;

  return (
    <Paper
      component="section"
      elevation={0}
      aria-labelledby="alert-overview-title"
      sx={{
        m: 1.5,
        p: { xs: 2, sm: 2.5 },
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Box>
          <Typography
            id="alert-overview-title"
            variant="overline"
            color="text.secondary"
          >
            {t("Current risk overview")}
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.25 }}>
            {t("{{count}} active alerts", { count: place.nAlerts || 0 })}
          </Typography>
        </Box>
        <AlertSeverityChip level={level} />
      </Stack>

      <Typography variant="body1" sx={{ mt: 1.5 }}>
        {t(SUMMARY_BY_LEVEL[level])}
      </Typography>

      {hazards.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2 }}>
          {hazards.map((hazard) => (
            <Chip key={hazard} label={t(hazard)} variant="outlined" />
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        <Chip
          size="small"
          icon={<VerifiedOutlinedIcon />}
          label={t("{{count}} official", { count: place.nOfficialAlerts || 0 })}
          color={place.nOfficialAlerts > 0 ? "warning" : "default"}
        />
        <Chip
          size="small"
          icon={<ScienceOutlinedIcon />}
          label={t("{{count}} experimental", { count: place.nAutoAlerts || 0 })}
          color={place.nAutoAlerts > 0 ? "warning" : "default"}
          variant="outlined"
        />
      </Box>

      <DataMeta
        timeUt={latestOfficialTime || place.openMeteoData?.timeUtNow}
        dataSourceList={officialSources}
        experimental={officialSources.length === 0}
        official={officialSources.length > 0}
      />
    </Paper>
  );
}
