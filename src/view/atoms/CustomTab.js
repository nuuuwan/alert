import Tab from "@mui/material/Tab";
import { COLORS } from "../_cons/StyleConstants";
import { useTranslation } from "react-i18next";

export default function CustomTab({ color, ...props }) {
  const { t } = useTranslation();
  const tabSx = {
    color: color || COLORS.neutralLight,
    borderRadius: 5,
    "&.Mui-selected": {
      color: color || COLORS.neutral,
    },
  };
  props.label = t(props.label);

  return <Tab {...props} sx={tabSx} />;
}
