import { Marker } from "react-leaflet";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import ReactDOMServer from "react-dom/server";
import EntIcon from "../atoms/EntIcon";
import { getAlertColor } from "../_cons/StyleConstants";
import { useNavigate } from "react-router-dom";

export default function MapPlaceView({ place }) {
  const navigate = useNavigate();
  if (!place) {
    throw new Error("MapPlaceView requires a place prop");
  }

  const iconSize = LOCATION_MARKER_RADIUS * 8;
  const circleSize = iconSize * 1.1;
  const opacity = 1;
  const placeColor = getAlertColor(place.alertLevel);

  const onClickInner = (e) => {
    L.DomEvent.stopPropagation(e);
    navigate(`/HydrometricStation/${place.name}`);
  };

  const entIconSvg = ReactDOMServer.renderToStaticMarkup(
    <EntIcon
      ent={place}
      size={iconSize}
      color={placeColor}
      strokeColor={placeColor}
    />,
  );

  return (
    <Marker
      position={place.latLng}
      icon={L.divIcon({
        className: "place-icon",
        html: `
            <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px; display: flex; align-items: cplaceer; justify-contplace: cplaceer; opacity: ${opacity};">
              <div style="position: absolute; width: ${circleSize}px; height: ${circleSize}px; background-color: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
              <div style="position: relative; z-index: 1;">
                ${entIconSvg}
              </div>
            </div>
          `,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize],
      })}
      eventHandlers={{
        click: onClickInner,
      }}
    />
  );
}
