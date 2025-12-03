import { Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import CustomDrawer from "./CustomDrawer";
import PlaceDetails from "./PlaceDetails";
import { LocationIcon } from "../atoms";
import { COLORS } from "../_cons/StyleConstants";

export default function MapPlaceView({ place, getFileName }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMarkerClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const defaultGetFileName = () => `${place.name || place.id}.png`;

  return (
    <>
      <Marker
        position={place.latLng}
        icon={L.divIcon({
          className: "place-icon",
          html: LocationIcon({
            size: LOCATION_MARKER_RADIUS * 8,
            color: COLORS.markerGray,
            strokeColor: COLORS.markerWhite,
          }),
          iconSize: [LOCATION_MARKER_RADIUS * 8, LOCATION_MARKER_RADIUS * 8],
          iconAnchor: [LOCATION_MARKER_RADIUS * 4, LOCATION_MARKER_RADIUS * 8],
        })}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      />
      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={place}
        renderContent={(place) => <PlaceDetails place={place} />}
        getFileName={getFileName || defaultGetFileName}
      />
    </>
  );
}
