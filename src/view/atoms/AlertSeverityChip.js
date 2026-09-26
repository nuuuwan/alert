import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import SeverityIcon from "./SeverityIcon";
import { getAlertMeta } from "../_cons/StyleConstants";

export default function AlertSeverityChip({ level, maxLevel = 3, compact }) {
  const { t } = useTranslation();
  const meta = getAlertMeta(level, maxLevel);

  return (
    <Chip
      icon={<SeverityIcon level={level} maxLevel={maxLevel} />}
      label={t(compact ? meta.shortLabel : meta.label)}
      size="small"
      sx={{
        color: "white",
        bgcolor: meta.color,
        "& .MuiChip-icon": { color: "white" },
      }}
    />
  );
}
