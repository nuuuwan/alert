import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MapIcon from "@mui/icons-material/Map";
import WarningIcon from "@mui/icons-material/Warning";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomBottomNavigator({
  onCurrentLocation,
  onSetToMapCenter,
  setPageMode,
}) {
  const handleCurrentLocation = () => {
    onCurrentLocation();
  };

  const handleSetToMapCenter = () => {
    onSetToMapCenter();
  };

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
        sx={{
          bgcolor: COLORS.neutralLightest,
        }}
      >
        {" "}
        <BottomNavigationAction icon={<MapIcon />} onClick={handleMapMode} />
        <BottomNavigationAction
          icon={<WarningIcon />}
          onClick={handleAlertsMode}
        />
        <BottomNavigationAction
          icon={<AssessmentIcon />}
          onClick={handleDataMode}
        />
        <BottomNavigationAction
          icon={<MyLocationIcon />}
          onClick={handleCurrentLocation}
        />
        <BottomNavigationAction
          icon={<LocationSearchingIcon />}
          onClick={handleSetToMapCenter}
        />
      </BottomNavigation>
    </Paper>
  );
}
