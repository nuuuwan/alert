import Box from "@mui/material/Box";
import DetailsHeader from "./DetailsHeader";
import RoleDetails from "./roles/RoleDetails";
import { SatelliteImageView } from "../atoms";
import RoleIcon from "../atoms/icons/RoleIcon";

export default function EntDetails({
  ent,
  entColor,
  eventClassNameToEventList,
  isWithinValidityWindow,
}) {
  if (!ent) {
    return null;
  }

  const hasLatLng = !!ent.latLng;

  const eventClassNames = Object.keys(eventClassNameToEventList);
  const eventClassName = eventClassNames[0];

  const Icon = RoleIcon.get(eventClassName);

  const overlineText = ent.id !== ent.name ? ent.id : undefined;
  const subtitle = ent.constructor.getEntTypeTitle() || "Entity";

  return (
    <Box>
      <DetailsHeader
        overlineText={overlineText}
        title={ent.name}
        titleColor={entColor}
        subtitle={subtitle}
        Icon={Icon}
        iconColor={entColor}
        isWithinValidityWindow={isWithinValidityWindow}
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
