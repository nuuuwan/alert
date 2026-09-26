import { Skeleton, Stack, Typography } from "@mui/material";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import DSDLocationBreadcrumbs from "../moles/DSDLocationBreadcrumbs";
import { useTranslation } from "react-i18next";
import { useDataContext } from "../../nonview/core/DataContext";
import { useEffect } from "react";

export default function EntTitle() {
  const { t } = useTranslation();
  const { selectedEnt } = useSelectedEntDataContext();
  const { data } = useDataContext();
  const { hydrometricStations, majorCities } = data;

  const isLoaded = hydrometricStations && majorCities && selectedEnt;

  useEffect(() => {
    document.title = selectedEnt ? `${selectedEnt.title} · ALERT` : "ALERT";
  }, [selectedEnt]);

  if (!isLoaded) {
    return (
      <Stack spacing={0.5} aria-label={t("Loading selected location")}>
        <Skeleton width={130} height={20} />
        <Skeleton width={90} height={14} />
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      spacing={0.125}
      justifyContent="center"
      alignItems="flex-start"
      minWidth={0}
      width="100%"
      sx={{ textAlign: "left", lineHeight: 1 }}
    >
      <Typography
        variant="body2"
        fontWeight={800}
        noWrap
        sx={{
          width: "100%",
          lineHeight: 1.25,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t(selectedEnt.title)}
      </Typography>
      <DSDLocationBreadcrumbs ent={selectedEnt} />
    </Stack>
  );
}
