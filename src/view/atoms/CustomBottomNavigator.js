import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import DownloadIcon from "@mui/icons-material/Download";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import { useState } from "react";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomBottomNavigator({
  onCurrentLocation,
  onSetToMapCenter,
  onDownload,
}) {
  const [value, setValue] = useState(0);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      onCurrentLocation();
    } else if (newValue === 1) {
      onSetToMapCenter();
    } else if (newValue === 2) {
      onDownload();
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
        value={value}
        onChange={handleNavigationChange}
        sx={{
          bgcolor: COLORS.neutralLightest,
        }}
      >
        <BottomNavigationAction icon={<MyLocationIcon />} />
        <BottomNavigationAction icon={<PlaceIcon />} />
        <BottomNavigationAction icon={<DownloadIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
