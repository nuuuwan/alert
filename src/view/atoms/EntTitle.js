import { CircularProgress, Stack, Typography } from "@mui/material";
import EntAvatar from "./EntAvatar";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import DSDLocationBreadcrumbs from "../moles/DSDLocationBreadcrumbs";
import { useTranslation } from "react-i18next";

export default function EntTitle() {
  const { t } = useTranslation();
  const { selectedEnt } = useSelectedEntDataContext();
  if (!selectedEnt) {
    document.title = "ALERT Loading...";
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircularProgress />
        <Typography variant="body1">{t("Loading Data")}...</Typography>
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
