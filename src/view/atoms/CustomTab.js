import Tab from "@mui/material/Tab";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomTab(props) {
  const tabSx = {
    backgroundColor: COLORS.neutralLighterTransparent,
    color: "black",
    padding: 1,
    margin: 1,
    borderRadius: 5,
    "&.Mui-selected": {
      backgroundColor: COLORS.neutralLight,
      color: "white",
    },
  };

  return <Tab {...props} sx={tabSx} />;
}
