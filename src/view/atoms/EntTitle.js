import { CircularProgress, Stack, Typography } from "@mui/material";
import EntAvatar from "./EntAvatar";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import DSDLocationBreadcrumbs from "../moles/DSDLocationBreadcrumbs";
import { useTranslation } from "react-i18next";
import { useDataContext } from "../../nonview/core/DataContext";

export default function EntTitle() {
  const { t } = useTranslation();
  const { selectedEnt } = useSelectedEntDataContext();
  const { data } = useDataContext();
  const {hydrometricStations,majorCities} = data;

  const isLoaded = hydrometricStations && majorCities && selectedEnt; 
  
  if (!isLoaded) {
    document.title = "ALERT Loading...";
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircularProgress />
        <Typography variant="body1">...</Typography>
      </Stack>
    );
  }

  document.title = selectedEnt.title;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <EntAvatar ent={selectedEnt} color="white" size="32px" />
      <Stack direction="column" spacing={0} justifyContent="center">
        <Typography variant="body1">{t(selectedEnt.title)}</Typography>
        <DSDLocationBreadcrumbs ent={selectedEnt} />
      </Stack>
    </Stack>
  );
}
