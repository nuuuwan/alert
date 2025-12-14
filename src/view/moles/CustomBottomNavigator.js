import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MapIcon from "@mui/icons-material/Map";
import WarningIcon from "@mui/icons-material/Warning";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomBottomNavigator({
  onSetToMapCenter,
  setPageMode,
  pageMode,
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMapMode = () => {
    scrollToTop();
    setPageMode("Map");
  };

  const handleAlertsMode = () => {
    scrollToTop();
    onSetToMapCenter();
    setPageMode("Alerts");
  };

  const handleDataMode = () => {
    scrollToTop();
    onSetToMapCenter();
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
          value="Map"
          icon={<MapIcon />}
          disabled={pageMode === "Map"}
          sx={{
            ...(pageMode === "Map" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
            "&.Mui-selected": {
              color: "inherit",
            },
          }}
        />
        <BottomNavigationAction
          value="Alerts"
          icon={<WarningIcon />}
          disabled={pageMode === "Alerts"}
          sx={{
            ...(pageMode === "Alerts" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
            "&.Mui-selected": {
              color: "inherit",
            },
          }}
        />
        <BottomNavigationAction
          value="Data"
          icon={<AssessmentIcon />}
          disabled={pageMode === "Data"}
          sx={{
            ...(pageMode === "Data" && {
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }),
            "&.Mui-selected": {
              color: "inherit",
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
