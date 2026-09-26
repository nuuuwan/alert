import { Marker } from "react-leaflet";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import ReactDOMServer from "react-dom/server";
import EntIcon from "../atoms/EntIcon";
import { getAlertMeta } from "../_cons/StyleConstants";
import { useNavigate } from "react-router-dom";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

export default function MapPlaceView({ place, setPageMode }) {
  const navigate = useNavigate();
  const { setSelectedEnt } = useSelectedEntDataContext();
  if (!place) {
    throw new Error("MapPlaceView requires a place prop");
  }

  const iconSize = LOCATION_MARKER_RADIUS * 8;
  const circleSize = iconSize * 1.1;
  const opacity = 1;
  const alertMeta = getAlertMeta(place.alertLevel, 3);
  const placeColor = alertMeta.color;

  const onClickInner = (e) => {
    L.DomEvent.stopPropagation(e);
    setPageMode("Alerts");
    setSelectedEnt(null);
    navigate(place.url);
  };

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
      <EntIcon ent={place} size={iconSize} color={placeColor} />
    </div>,
  );
  const severitySymbol = ["✓", "i", "!", "!!"][alertMeta.level];

  entIconSvg = entIconSvg.replace(
    "<svg",
    `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="${placeColor}" style="color:${placeColor};display:block"`,
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
              <div aria-hidden="true" style="position: absolute; right: -6px; bottom: -6px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; background: ${placeColor}; color: white; border: 2px solid white; border-radius: 50%; box-shadow: 0 1px 4px rgba(15,23,42,.35); font: 800 ${alertMeta.level === 3 ? 9 : 12}px/1 Arial,sans-serif; z-index: 2100;">
                ${severitySymbol}
              </div>
            </div>
          `,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2], // Center the icon on the latLng
      })}
      title={`${place.title}: ${alertMeta.label}`}
      alt={`${place.title}: ${alertMeta.label}`}
      eventHandlers={{
        click: onClickInner,
      }}
    />
  );
}
