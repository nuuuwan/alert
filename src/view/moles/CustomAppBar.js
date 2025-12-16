import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { COLORS } from "../_cons/StyleConstants";
import EntTitle from "../atoms/EntTitle";
import CustomAppBarMenu from "./CustomAppBarMenu";

export default function CustomAppBar({ selectedEnt, mapLatLng }) {
  const title =
    (selectedEnt ? selectedEnt.title : null) ||
    (mapLatLng ? mapLatLng.title : null) ||
    "ALERT";

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: COLORS.neutral,
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
