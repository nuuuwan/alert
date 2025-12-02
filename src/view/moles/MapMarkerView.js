import { CircleMarker, Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import MarkerDrawer from "./MarkerDrawer";

export default function MapMarkerView({
  items,
  markerType,
  radius,
  pathOptions,
  labelStyle,
  renderPopupContent,
  formatLabel = (item) => item.name,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMarkerClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      {items.map((item, index) => (
        <>
          <CircleMarker
            key={`${markerType}-${index}`}
            center={item.latLng}
            radius={radius}
            pathOptions={pathOptions}
            eventHandlers={{
              click: () => handleMarkerClick(item),
            }}
          />
          <Marker
            key={`${markerType}-label-${index}`}
            position={item.latLng}
            icon={L.divIcon({
              className: `${markerType}-label`,
              html: `<div style="font-size: ${
                radius * 2
              }px; ${labelStyle} white-space: nowrap; 
              line-height: 1; transform: translateY(-50%);">${formatLabel(
                item
              )}</div>`,
              iconSize: [0, 0],
              iconAnchor: [-radius * 2, radius / 2],
            })}
            interactive={false}
          />
        </>
      ))}
      <MarkerDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={selectedItem}
        renderContent={renderPopupContent}
      />
    </>
  );
}
