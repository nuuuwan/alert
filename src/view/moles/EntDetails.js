import Place from "../../nonview/core/ents/Place";
import Box from "@mui/material/Box";
import DetailsHeader from "./DetailsHeader";
import PlaceDetails from "./PlaceDetails";
import RoleIcon from "../atoms/icons/RoleIcon";

export default function EntDetails({
  ent,
  entColor,
  eventClassNameToEventList,
  isStale,
}) {
  if (!ent) {
    return null;
  }

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
        isStale={isStale}
      />

      {ent instanceof Place ? (
        <PlaceDetails
          place={ent}
          eventClassNameToEventList={eventClassNameToEventList}
          isStale={isStale}
        />
      ) : null}
    </Box>
  );
}
