import PlaceLink from "../atoms/PlaceLink";
import CustomPaper from "../atoms/CustomPaper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { COLORS } from "../_cons/StyleConstants";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function NearbyPlacesView({ ent }) {
  const { t } = useTranslation();
  const nearbyPlaces = ent.nearbyPlaces;
  return (
    <CustomPaper>
      <Typography variant="caption" color={COLORS.neutral} sx={{ mb: 1 }}>
        {t("Nearby")}
      </Typography>
      <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
        {nearbyPlaces && nearbyPlaces.length > 0 ? (
          nearbyPlaces.map(([place, distanceM]) => (
            <PlaceLink key={place.id} place={place} distanceM={distanceM} />
          ))
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </CustomPaper>
  );
}
