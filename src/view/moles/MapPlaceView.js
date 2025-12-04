import { Marker } from "react-leaflet";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import RoleIcon from "../atoms/icons/RoleIcon";

export default function MapPlaceView({
  place,
  eventClassNameToEventList,
  onClick,
}) {
  const eventClassNames = Object.keys(eventClassNameToEventList);

  const firstClassName = eventClassNames[0];
  const Icon = RoleIcon.get(firstClassName);
  return (
    <>
      <Marker
        position={place.latLng}
        icon={L.divIcon({
          className: "place-icon",
          html: Icon({
            size: LOCATION_MARKER_RADIUS * 8,
            color: "black",
            strokeColor: "black",
          }),
          iconSize: [LOCATION_MARKER_RADIUS * 8, LOCATION_MARKER_RADIUS * 8],
          iconAnchor: [LOCATION_MARKER_RADIUS * 4, LOCATION_MARKER_RADIUS * 8],
        })}
        eventHandlers={{
          click: onClick,
        }}
      />
    </>
  );
}
