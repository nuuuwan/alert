import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WaterIcon from "@mui/icons-material/Water";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

export default function CustomAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1000,
        backgroundColor: "rgba(25, 118, 210, 0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar variant="dense">
        <WaterIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ALERT
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            size="small"
            aria-label="info"
            onClick={() =>
              window.open("https://github.com/nuuuwan/alert", "_blank")
            }
          >
            <InfoIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
