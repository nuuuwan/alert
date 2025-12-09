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
    navigate(place.url);
  };

  // Ensure MUI icons render correctly by wrapping them in a div with proper styling.
  // Added debugging to log the generated SVG markup and ensure styles are applied correctly.
  const entIconSvg = ReactDOMServer.renderToStaticMarkup(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: iconSize,
        height: iconSize,
      }}
    >
      <EntIcon
        ent={place}
        size={iconSize}
        color={placeColor}
        strokeColor={placeColor}
      />
    </div>
  );

  console.debug("Generated entIconSvg:", entIconSvg);

  return (
    <Marker
      position={place.latLng}
      icon={L.divIcon({
        className: "place-icon",
        html: `
            <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px; display: flex; align-items: center; justify-content: center; opacity: ${opacity};">
              <div style="position: absolute; width: ${circleSize}px; height: ${circleSize}px; background-color: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
              <div style="position: relative; z-index: 1; display: flex; align-items: center; justify-content: center;">
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
