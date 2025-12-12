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
  // Safari requires SVG namespace declaration for proper rendering in Leaflet markers.
  let entIconSvg = ReactDOMServer.renderToStaticMarkup(
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

  // Fix Safari SVG rendering by adding namespace and dimensions
  entIconSvg = entIconSvg.replace(
    "<svg",
    `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}"`
  );

  return (
    <Marker
      position={place.latLng}
      icon={L.divIcon({
        className: "place-icon",
        html: `
            <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px; display: flex; align-items: center; justify-content: center; opacity: ${opacity}; z-index: 1500;">
              <div style="position: absolute; width: ${circleSize}px; height: ${circleSize}px; background-color: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 1500;"></div>
              <div style="position: relative; z-index: 2000; display: flex; align-items: center; justify-content: center;">
                ${entIconSvg}
              </div>
            </div>
          `,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2], // Center the icon on the latLng
      })}
      eventHandlers={{
        click: onClickInner,
      }}
    />
  );
}
