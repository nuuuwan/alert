import { useEffect, useState } from "react";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";
import MapPlaceView from "./MapPlaceView";
import MapRegionView from "./MapRegionView";
import Place from "../../nonview/core/ents/Place";

export default function MapEntView({ ent, eventClassNameToEventList }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [entColor, setEntColor] = useState(null);

  useEffect(() => {
    async function fetchColor() {
      const firstEvent = Object.values(eventClassNameToEventList)[0][0];
      const color = await firstEvent.getColor(firstEvent);
      setEntColor(color);
    }
    fetchColor();
  }, [eventClassNameToEventList]);

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => `${ent.id}.png`;

  const MapEntViewInner = ent instanceof Place ? MapPlaceView : MapRegionView;

  return (
    <>
      <MapEntViewInner
        place={ent}
        eventClassNameToEventList={eventClassNameToEventList}
        onClick={handleClick}
        entColor={entColor}
      />
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
