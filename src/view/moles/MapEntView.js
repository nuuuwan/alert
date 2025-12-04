import { useEffect, useState } from "react";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";
import MapPlaceView from "./MapPlaceView";
import MapRegionView from "./MapRegionView";
import Place from "../../nonview/core/ents/Place";
import { COLORS } from "../_cons/StyleConstants";

export default function MapEntView({ ent, eventClassNameToEventList }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [entColor, setEntColor] = useState(null);

  const firstEvent = Object.values(eventClassNameToEventList)[0][0];
  const isStale = firstEvent.isStale();

  useEffect(() => {
    async function fetchColor() {
      const color = isStale
        ? COLORS.gray
        : await firstEvent.getColor(firstEvent);
      setEntColor(color);
    }
    fetchColor();
  }, [firstEvent, isStale]);

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
        ent={ent}
        eventClassNameToEventList={eventClassNameToEventList}
        onClick={handleClick}
        entColor={entColor}
        isStale={isStale}
      />
      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={ent}
        renderContent={(ent) => (
          <EntDetails
            ent={ent}
            entColor={entColor}
            eventClassNameToEventList={eventClassNameToEventList}
            isStale={isStale}
          />
        )}
        getFileName={getFileName}
      />
    </>
  );
}
