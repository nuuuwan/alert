import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SummaryAlertCard from "./SummaryAlertCard";

export default function SummaryAlertSection({ title, alerts, official }) {
  const { t } = useTranslation();

  return (
    <Box component="section">
      <Typography variant="h2" sx={{ mb: 1 }}>
        {t(title)}
      </Typography>
      {alerts.length ? (
        <Stack spacing={1}>
          {alerts.map((alert) => (
            <SummaryAlertCard
              key={alert.name}
              alert={alert}
              official={official}
            />
          ))}
        </Stack>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary">
            {t(
              official
                ? "No active official alerts."
                : "No active experimental alerts.",
            )}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
