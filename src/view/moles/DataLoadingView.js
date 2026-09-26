import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useDataContext } from "../../nonview/core/DataContext";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import StatePanel from "../atoms/StatePanel";

export default function DataLoadingView() {
  const { t } = useTranslation();
  const { status, reloadData, isOnline } = useDataContext();
  const { selectedStatus, reloadSelectedEnt } = useSelectedEntDataContext();
  const states = [...Object.values(status), selectedStatus];
  const hasError = states.includes("error");
  const completed = states.filter((state) => state === "success").length;
  const progress = (completed / states.length) * 100;

  const retry = () => {
    reloadData();
    reloadSelectedEnt();
  };

  return (
    <Modal
      open
      aria-labelledby="loading-dialog-title"
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(15, 23, 42, 0.18)",
            backdropFilter: "blur(1px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(440px, calc(100vw - 32px))",
          maxHeight: "calc(100dvh - 160px)",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: { xs: 2.5, sm: 3 },
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {!isOnline ? (
            <StatePanel
              state="offline"
              title="You are offline"
              message="Reconnect to load current alert information. Previously loaded data may still be available."
              onRetry={retry}
              compact
            />
          ) : hasError ? (
            <StatePanel
              state="error"
              title="We could not load current data"
              message="Some alert services did not respond. Check your connection and try again."
              onRetry={retry}
              compact
            />
          ) : (
            <Stack spacing={1.5} role="status" aria-live="polite">
              <Typography
                id="loading-dialog-title"
                variant="subtitle1"
                sx={{ textAlign: "center" }}
              >
                {t("Loading current alert data")}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                aria-label={t("Loading progress")}
                sx={{ width: "100%", height: 8, borderRadius: 4 }}
              />
            </Stack>
          )}
        </Paper>
      </Box>
    </Modal>
  );
}
