import { Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";
import {
  GaugeStationIcon,
  LocationIcon,
  WeatherStationIcon,
} from "../atoms/icons";

export default function MapPlaceView({ place, eventClassNameToEventList }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const eventClassNames = Object.keys(eventClassNameToEventList);

  const handleMarkerClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const defaultGetFileName = () => `${place.id}.png`;

  const firstClassName = eventClassNames[0];
  let Icon = LocationIcon;
  if (firstClassName === "RiverWaterLevelMeasurement") {
    Icon = GaugeStationIcon;
  } else if (firstClassName === "WeatherReport") {
    Icon = WeatherStationIcon;
  }
  return (
    <>
      <Marker
        position={place.latLng}
        icon={L.divIcon({
          className: "place-icon",
          html: Icon({
            size: LOCATION_MARKER_RADIUS * 8,
            color: "black",
            strokeColor: "black",
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
        renderContent={(place) => (
          <EntDetails
            ent={place}
            eventClassNameToEventList={eventClassNameToEventList}
          />
        )}
        getFileName={defaultGetFileName}
      />
    </>
  );
}
