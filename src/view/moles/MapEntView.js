import { useState } from "react";
import CustomDrawer from "./CustomDrawer";
import EntDetails from "./EntDetails";
import MapPlaceView from "./MapPlaceView";
import MapRegionView from "./MapRegionView";
import Place from "../../nonview/core/ents/Place";

export default function MapEntView({ ent, dbResultsForEnt }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { eventNdxTdx, alertNdxTdx } = dbResultsForEnt;

  const eventClassNameToEventList = Object.entries(eventNdxTdx).reduce(
    (acc, [eventClassName, eventTdx]) => {
      acc[eventClassName] = Object.values(eventTdx);
      return acc;
    },
    {}
  );

  const nEvents = Object.values(eventClassNameToEventList).reduce(
    (sum, eventList) => sum + eventList.length,
    0
  );
  if (nEvents === 0) {
    return null;
  }

  const alerts = Object.values(alertNdxTdx).reduce(function (alerts, alertTdx) {
    return alerts.concat(Object.values(alertTdx));
  }, []);

  const sortedAlerts = alerts.sort((a, b) => b.timeUt - a.timeUt);
  const alert = alerts.length > 0 ? sortedAlerts[0] : null;
  const entColor = alert ? alert.constructor.getColor() : "gray";

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => `${ent.id}.png`;

  const MapEntViewInner = ent instanceof Place ? MapPlaceView : MapRegionView;

  const isStale = false;

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
