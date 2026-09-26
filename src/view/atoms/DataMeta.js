import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useTranslation } from "react-i18next";
import TimeUtils from "../../nonview/base/TimeUtils";

const STALE_AFTER_SECONDS = 6 * 60 * 60;

export default function DataMeta({
  timeUt,
  dataSourceList = [],
  experimental = false,
  official = false,
  staleAfterSeconds = STALE_AFTER_SECONDS,
}) {
  const { t } = useTranslation();
  const validTime = Number.isFinite(Number(timeUt));
  const ageSeconds = validTime ? TimeUtils.getUnixTime() - Number(timeUt) : 0;
  const isStale = validTime && ageSeconds > staleAfterSeconds;
  const exactTime = validTime
    ? new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Colombo",
        timeZoneName: "short",
      }).format(new Date(Number(timeUt) * 1000))
    : t("Update time unavailable");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        mt: 1.5,
        pt: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography
          variant="caption"
          color={isStale ? "warning.main" : "text.secondary"}
        >
          <span title={exactTime}>
            {validTime
              ? `${t("Updated")} ${TimeUtils.getTimeAgoString(Number(timeUt))}`
              : t("Update time unavailable")}
          </span>
          {isStale ? ` · ${t("May be outdated")}` : ""}
        </Typography>
      </Box>

      <Chip
        size="small"
        variant="outlined"
        icon={
          experimental ? (
            <ScienceOutlinedIcon />
          ) : official ? (
            <VerifiedOutlinedIcon />
          ) : (
            <LinkOutlinedIcon />
          )
        }
        label={t(
          experimental
            ? "Experimental"
            : official
              ? "Official source"
              : "Data source",
        )}
        sx={{ height: 24 }}
      />

      {dataSourceList.map((source, index) => (
        <Link
          key={`${source.url}-${index}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="caption"
        >
          {t(source.label)}
        </Link>
      ))}
    </Box>
  );
}
