import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import EntTitle from "../atoms/EntTitle";
import CustomAppBarMenu from "./CustomAppBarMenu";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

export default function CustomAppBar({ mapLatLng }) {
  const { selectedEnt } = useSelectedEntDataContext();

  const color = selectedEnt
    ? getAlertColor(selectedEnt.alertLevel || 0, 3)
    : COLORS.neutral;

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: color,
        zIndex: 1000,
      }}
    >
      <Toolbar>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <EntTitle ent={selectedEnt} mapLatLng={mapLatLng} />
        </div>
        <CustomAppBarMenu />
      </Toolbar>
    </AppBar>
  );
}
