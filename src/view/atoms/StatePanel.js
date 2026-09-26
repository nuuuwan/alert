import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ReplayIcon from "@mui/icons-material/Replay";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { useTranslation } from "react-i18next";

export default function StatePanel({
  state,
  title,
  message,
  onRetry,
  compact = false,
}) {
  const { t } = useTranslation();
  const isLoading = state === "loading";
  const isOffline = state === "offline";
  const severity = state === "error" ? "error" : "info";

  return (
    <Alert
      severity={severity}
      icon={
        isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : isOffline ? (
          <WifiOffIcon />
        ) : undefined
      }
      sx={{ m: compact ? 0 : 2, alignItems: "center" }}
      role={state === "error" || isOffline ? "alert" : "status"}
      action={
        onRetry && !isLoading ? (
          <Button
            color="inherit"
            size="small"
            startIcon={<ReplayIcon />}
            onClick={onRetry}
          >
            {t("Retry")}
          </Button>
        ) : null
      }
    >
      {title && <AlertTitle>{t(title)}</AlertTitle>}
      <Box>{t(message)}</Box>
    </Alert>
  );
}
