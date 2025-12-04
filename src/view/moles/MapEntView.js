import { useState } from "react";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";
import MapPlaceView from "./MapPlaceView";
import MapRegionView from "./MapRegionView";

export default function MapEntView({
  ent,
  eventClassNameToEventList,
  pathOptions,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => `${ent.id}.png`;

  // Determine if it's a place (has latLng) or region
  const isPlace = !!ent.latLng;

  return (
    <>
      {isPlace ? (
        <MapPlaceView
          place={ent}
          eventClassNameToEventList={eventClassNameToEventList}
          onClick={handleClick}
        />
      ) : (
        <MapRegionView
          region={ent}
          pathOptions={pathOptions}
          eventClassNameToEventList={eventClassNameToEventList}
          onClick={handleClick}
        />
      )}
      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={ent}
        renderContent={(ent) => (
          <EntDetails
            ent={ent}
            fillColor={pathOptions?.fillColor}
            eventClassNameToEventList={eventClassNameToEventList}
          />
        )}
        getFileName={getFileName}
      />
    </>
  );
}
