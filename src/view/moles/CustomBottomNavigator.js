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
  const handleMapMode = () => {
    setPageMode("Map");
  };

  const handleAlertsMode = () => {
    onSetToMapCenter();
    setPageMode("Alerts");
  };

  const handleDataMode = () => {
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
          label="1. Select Location"
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
          label="2. View Alerts"
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
          label="3. View More Data"
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
