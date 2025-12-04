import { Marker } from "react-leaflet";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import RoleIcon from "../atoms/icons/RoleIcon";

export default function MapPlaceView({
  ent,
  eventClassNameToEventList,
  onClick,
  entColor,
  isStale,
}) {
  const eventClassNames = Object.keys(eventClassNameToEventList);
  const firstClassName = eventClassNames[0];
  const Icon = RoleIcon.get(firstClassName);
  const iconSize = LOCATION_MARKER_RADIUS * 8;
  const circleSize = iconSize * 1.1;
  const opacity = isStale ? 0.25 : 1;

  return (
    <>
      <Marker
        position={ent.latLng}
        icon={L.divIcon({
          className: "place-icon",
          html: `
            <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px; display: flex; align-items: center; justify-content: center; opacity: ${opacity};">
              <div style="position: absolute; width: ${circleSize}px; height: ${circleSize}px; background-color: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
              <div style="position: relative; z-index: 1;">
                ${Icon({
                  size: iconSize,
                  color: entColor,
                  strokeColor: entColor,
                })}
              </div>
            </div>
          `,
          iconSize: [iconSize, iconSize],
          iconAnchor: [iconSize / 2, iconSize],
        })}
        eventHandlers={{
          click: onClick,
        }}
      />
    </>
  );
}
