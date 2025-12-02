import { CircleMarker, Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            marginTop: "48px",
            height: "calc(100% - 48px)",
          },
        }}
      >
        <Box sx={{ p: 2, position: "relative" }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mt: 4 }}>
            {selectedItem && renderPopupContent(selectedItem)}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
