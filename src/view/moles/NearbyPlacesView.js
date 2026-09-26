import PlaceLink from "../atoms/PlaceLink";
import CustomPaper from "../atoms/CustomPaper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";
import StatePanel from "../atoms/StatePanel";

export default function NearbyPlacesView({ ent }) {
  const { t } = useTranslation();
  const { nearbyPlaces, nearbyStatus } = useSelectedEntDataContext();
  return (
    <CustomPaper>
      <Typography variant="caption" sx={{ mb: 1 }}>
        {t("Nearby")}
      </Typography>
      <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
        {nearbyStatus === "loading" ? (
          <StatePanel
            state="loading"
            message="Finding nearby services"
            compact
          />
        ) : nearbyStatus === "error" ? (
          <StatePanel
            state="error"
            message="Nearby services could not be loaded."
            compact
          />
        ) : nearbyStatus === "empty" ? (
          <StatePanel
            state="empty"
            message="No nearby services were found."
            compact
          />
        ) : (
          nearbyPlaces.map(([place, distanceM]) => (
            <PlaceLink key={place.id} place={place} distanceM={distanceM} />
          ))
        )}
      </Stack>
    </CustomPaper>
  );
}
