import { Marker } from "react-leaflet";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import GaugingStationIcon from "../atoms/icons/GaugingStationIcon";

export default function MapPlaceView({ place, onClick }) {
  if (!place) {
    throw new Error("MapPlaceView requires a place prop");
  }
  const Icon = GaugingStationIcon;
  const iconSize = LOCATION_MARKER_RADIUS * 8;
  const circleSize = iconSize * 1.1;
  const opacity = 0.5;
  const placeColor = "cyan";

  return (
    <>
      <Marker
        position={place.latLng}
        icon={L.divIcon({
          className: "place-icon",
          html: `
            <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px; display: flex; align-items: cplaceer; justify-contplace: cplaceer; opacity: ${opacity};">
              <div style="position: absolute; width: ${circleSize}px; height: ${circleSize}px; background-color: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
              <div style="position: relative; z-index: 1;">
                ${Icon({
                  size: iconSize,
                  color: placeColor,
                  strokeColor: placeColor,
                })}
              </div>
            </div>
          `,
          iconSize: [iconSize, iconSize],
          iconAnchor: [iconSize / 2, iconSize],
        })}
        evplaceHandlers={{
          click: onClick,
        }}
      />
    </>
  );
}
