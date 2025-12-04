import { useState } from "react";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";
import MapPlaceView from "./MapPlaceView";
import MapRegionView from "./MapRegionView";
import Place from "../../nonview/core/ents/Place";

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

  return (
    <>
      {ent instanceof Place ? (
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
