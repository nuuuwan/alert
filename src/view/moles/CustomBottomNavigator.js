import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MapIcon from "@mui/icons-material/Map";
import WarningIcon from "@mui/icons-material/Warning";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { COLORS } from "../_cons/StyleConstants";
import { useTranslation } from "react-i18next";

export default function CustomBottomNavigator({
  onSetToMapCenter,
  setPageMode,
  pageMode,
}) {
  const { t } = useTranslation();
  const handleMapMode = () => {
    setPageMode("Map");
  };

  const handleAlertsMode = () => {
    setPageMode("Alerts");
  };

  const handleDataMode = () => {
    setPageMode("Data");
  };

  const handleNavigationChange = (event, newValue) => {
    if (newValue === "Map") {
      handleMapMode();
    } else if (newValue === "Alerts") {
      handleAlertsMode();
    } else if (newValue === "Data") {
      handleDataMode();
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 60,
        paddingBottom: 5,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={pageMode}
        onChange={handleNavigationChange}
        sx={{
          bgcolor: COLORS.neutralLightest,
        }}
      >
        <BottomNavigationAction
          label={t("Map")}
          value="Map"
          icon={<MapIcon />}
          disabled={pageMode === "Map"}
          showLabel={true}
          sx={{
            ...(pageMode === "Map" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
        <BottomNavigationAction
          label={t("Alerts")}
          value="Alerts"
          icon={<WarningIcon />}
          disabled={pageMode === "Alerts"}
          showLabel={true}
          sx={{
            ...(pageMode === "Alerts" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
        <BottomNavigationAction
          label={t("Data")}
          value="Data"
          icon={<AssessmentIcon />}
          disabled={pageMode === "Data"}
          showLabel={true}
          sx={{
            ...(pageMode === "Data" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
