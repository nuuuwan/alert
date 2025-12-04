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

  useEffect(() => {
    async function fetchColor() {
      const firstEvent = Object.values(eventClassNameToEventList)[0][0];
      const isWithinValidityWindow = firstEvent.isWithinValidityWindow();
      const color = isWithinValidityWindow
        ? await firstEvent.getColor(firstEvent)
        : COLORS.gray;
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
        ent={ent}
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
            entColor={entColor}
            eventClassNameToEventList={eventClassNameToEventList}
          />
        )}
        getFileName={getFileName}
      />
    </>
  );
}
