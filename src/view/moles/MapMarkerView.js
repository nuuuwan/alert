import { Marker } from "react-leaflet";
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
  getFileName,
  iconComponent,
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
          <Marker
            key={`${markerType}-${index}`}
            position={item.latLng}
            icon={L.divIcon({
              className: `${markerType}-icon`,
              html: iconComponent({
                size: radius * 8,
                color: pathOptions.color,
                strokeColor: pathOptions.fillColor,
              }),
              iconSize: [radius * 8, radius * 8],
              iconAnchor: [radius * 4, radius * 8],
            })}
            eventHandlers={{
              click: () => handleMarkerClick(item),
            }}
          />
          <Marker
            key={`${markerType}-label-${index}`}
            position={item.latLng}
            icon={L.divIcon({
              className: `${markerType}-label`,
              html: `<div style="font-family: 'Ubuntu Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: ${
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
      <MarkerDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={selectedItem}
        renderContent={renderPopupContent}
        getFileName={getFileName}
      />
    </>
  );
}
