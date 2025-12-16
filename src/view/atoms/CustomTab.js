import Tab from "@mui/material/Tab";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomTab(props) {
  const tabSx = {
    backgroundColor: COLORS.neutralLighterTransparent,
    color: "black",
    borderRadius: "50px",
    margin: "4px",
    minWidth: "auto",
    padding: "8px 16px",
    "&.Mui-selected": {
      backgroundColor: COLORS.neutralLightTransparent,
      color: "white",
    },
  };

  return <Tab {...props} sx={tabSx} />;
}
