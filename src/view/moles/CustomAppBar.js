import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import EntTitle from "../atoms/EntTitle";
import AlertSeverityChip from "../atoms/AlertSeverityChip";
import CustomAppBarMenu from "./CustomAppBarMenu";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

export default function CustomAppBar() {
  const { selectedEnt } = useSelectedEntDataContext();

  return (
    <AppBar
      color="inherit"
      elevation={0}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(255, 255, 255, 0.96)",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(12px)",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: "64px", px: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 30,
              height: 30,
              borderRadius: "9px",
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            A
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
          >
            ALERT
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ my: 1.5 }} />
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            height: 42,
            display: "flex",
            alignItems: "center",
          }}
        >
          <EntTitle ent={selectedEnt} />
        </Box>
        {selectedEnt && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <AlertSeverityChip level={selectedEnt.alertLevel} compact />
          </Box>
        )}
        <CustomAppBarMenu />
      </Toolbar>
    </AppBar>
  );
}
