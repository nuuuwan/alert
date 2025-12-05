import Box from "@mui/material/Box";
import RoleDetails from "./roles/RoleDetails";
import { SatelliteImageView } from "../atoms";
import OpenMeteoView from "./OpenMeteoView";

export default function PlaceDetails({
  place,
  eventClassNameToEventList,
  isStale,
}) {
  return (
    <Box>
      {Object.entries(eventClassNameToEventList).map(function ([
        eventClassName,
        eventList,
      ]) {
        if (eventList.length === 0) {
          return null;
        }
        return (
          <RoleDetails
            key={eventClassName}
            eventClassName={eventClassName}
            ent={place}
            eventList={eventList}
            isStale={isStale}
          />
        );
      })}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 1,
          mb: 1,
        }}
      >
        <OpenMeteoView latLng={place.latLng} name={place.name} />
        <SatelliteImageView latLng={place.latLng} name={place.name} />
      </Box>
    </Box>
  );
}
