import { Box, Stack, Typography } from "@mui/material";
import EntAvatar from "./EntAvatar";
import Place from "../../nonview/core/ents/places/Place";
import DSDLocationBreadcrumbs from "../moles/DSDLocationBreadcrumbs";
import { useTranslation } from "react-i18next";

export default function EntTitle({ ent, mapLatLng }) {
  const entDisplay = ent || Place.fromLatLng(mapLatLng);
  const { t } = useTranslation();

  document.title = entDisplay.title;
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <EntAvatar ent={entDisplay} color="white" size="32px" />
        <Stack direction="column" spacing={0} justifyContent="center">
          <Typography variant="body1">{t(entDisplay.title)}</Typography>
          <DSDLocationBreadcrumbs ent={entDisplay} />
        </Stack>
      </Stack>
    </Box>
  );
}
