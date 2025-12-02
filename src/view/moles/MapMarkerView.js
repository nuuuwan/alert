import { CircleMarker, Popup, Marker } from "react-leaflet";
import L from "leaflet";

export default function MapMarkerView({
  items,
  markerType,
  radius,
  pathOptions,
  labelStyle,
  renderPopupContent,
  formatLabel = (item) => item.name,
}) {
  return (
    <>
      {items.map((item, index) => (
        <>
          <CircleMarker
            key={`${markerType}-${index}`}
            center={item.latLng}
            radius={radius}
            pathOptions={pathOptions}
          >
            <Popup>{renderPopupContent(item)}</Popup>
          </CircleMarker>
          <Marker
            key={`${markerType}-label-${index}`}
            position={item.latLng}
            icon={L.divIcon({
              className: `${markerType}-label`,
              html: `<div style="font-size: ${
                radius * 2
              }px; ${labelStyle} white-space: nowrap; 
              line-height: 1; transform: translateY(-50%);">${formatLabel(
                item,
              )}</div>`,
              iconSize: [0, 0],
              iconAnchor: [-radius * 2, radius / 2],
            })}
            interactive={false}
          />
        </>
      ))}
    </>
  );
}
