import Box from "@mui/material/Box";
import DetailsHeader from "./DetailsHeader";
import RoleDetails from "./roles/RoleDetails";
import { SatelliteImageView } from "../atoms";
import RoleIcon from "../atoms/icons/RoleIcon";
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

  const eventClassNames = Object.keys(eventClassNameToEventList);
  const eventClassName = eventClassNames[0];

  const Icon = RoleIcon.get(eventClassName);
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
        Icon={Icon}
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
