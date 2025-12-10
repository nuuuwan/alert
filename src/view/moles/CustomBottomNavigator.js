import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CustomBottomNavigator({ isDrawerOpen, setDrawerOpen }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const IconDrawer = isDrawerOpen ? KeyboardArrowDownIcon : KeyboardArrowUpIcon;
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<MyLocationIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction icon={<IconDrawer />} onClick={toggleDrawer} />
      </BottomNavigation>
    </Paper>
  );
}
