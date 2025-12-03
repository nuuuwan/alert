import { Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import MarkerDrawer from "./MarkerDrawer";

export default function MapMarkerView({
  items,
  markerType,
  radius,
  pathOptions,
  renderPopupContent,
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
