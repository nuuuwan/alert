import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WaterIcon from "@mui/icons-material/Water";
import Box from "@mui/material/Box";
import AppBarMenu from "./AppBarMenu";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1000,
        backgroundColor: COLORS.neutral,
      }}
    >
      <Toolbar variant="dense">
        <WaterIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ALERT
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AppBarMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
