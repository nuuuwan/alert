import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import AlertSeverityChip from "../atoms/AlertSeverityChip";
import DataMeta from "../atoms/DataMeta";
import { getAlertColor } from "../_cons/StyleConstants";

export default function SummaryAlertCard({ alert, official }) {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderLeft: "4px solid",
        borderLeftColor: getAlertColor(alert.level),
      }}
    >
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Typography variant="h3">{t(alert.name)}</Typography>
        <AlertSeverityChip level={alert.level} compact />
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {t(alert.detail, alert.detailValues)}
      </Typography>
      <DataMeta
        timeUt={alert.timeUt}
        dataSourceList={alert.dataSourceList}
        official={official}
        experimental={!official}
      />
    </Paper>
  );
}
