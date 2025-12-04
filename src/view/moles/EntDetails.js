import Box from "@mui/material/Box";
import DetailsHeader from "./DetailsHeader";
import RoleDetails from "./roles/RoleDetails";
import { SatelliteImageView } from "../atoms";
import { LocationIcon, AdminRegionIcon } from "../atoms/icons";
import { COLORS } from "../_cons/StyleConstants";

export default function EntDetails({
  ent,
  fillColor,
  eventClassNameToEventList,
}) {
  if (!ent) {
    return null;
  }

  const hasLatLng = !!ent.latLng;

  const icon = hasLatLng ? LocationIcon : AdminRegionIcon;
  const iconColor = fillColor || COLORS.gray;

  const overlineText = ent.id !== ent.name ? ent.id : undefined;
  const subtitle = ent.constructor.getEntTypeTitle() || "Entity";

  return (
    <Box>
      <DetailsHeader
        overlineText={overlineText}
        title={ent.name}
        titleColor={fillColor}
        subtitle={subtitle}
        icon={icon}
        iconColor={iconColor}
      />

      {Object.entries(eventClassNameToEventList).map(function ([
        eventClassName,
        eventList,
      ]) {
        return (
          <RoleDetails
            key={eventClassName}
            eventClassName={eventClassName}
            ent={ent}
            eventList={eventList}
          />
        );
      })}

      {hasLatLng && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 1,
            mb: 1,
          }}
        >
          <SatelliteImageView latLng={ent.latLng} name={ent.name} />
        </Box>
      )}
    </Box>
  );
}
