import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CustomBottomNavigator() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
      </BottomNavigation>
    </Paper>
  );
}
