import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getAlertMeta } from "../_cons/StyleConstants";

export default function SeverityIcon({ level, maxLevel = 3, ...props }) {
  const { level: normalizedLevel } = getAlertMeta(level, maxLevel);
  const Icon = [
    CheckCircleOutlineIcon,
    InfoOutlinedIcon,
    WarningAmberIcon,
    ErrorOutlineIcon,
  ][normalizedLevel];
  return <Icon {...props} />;
}
