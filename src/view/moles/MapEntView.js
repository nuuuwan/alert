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
    {},
  );

  const nEvents = Object.values(eventClassNameToEventList).reduce(
    (sum, eventList) => sum + eventList.length,
    0,
  );
  if (nEvents === 0) {
    return null;
  }

  const sortedEvents = Object.values(eventNdxTdx)
    .reduce(function (events, eventTdx) {
      return events.concat(Object.values(eventTdx));
    }, [])
    .sort((a, b) => b.timeUt - a.timeUt);

  const lastEvent = sortedEvents[0];

  let entColor = "grey";
  if (!lastEvent.isStale()) {
    const alerts = Object.values(alertNdxTdx).reduce(function (
      alerts,
      alertTdx,
    ) {
      return alerts.concat(Object.values(alertTdx));
    }, []);
    const lastAlerts = alerts.filter((alert) => alert.event === lastEvent);
    const lastAlert = lastAlerts.length > 0 ? lastAlerts[0] : null;
    entColor = lastAlert ? lastAlert.constructor.getColor() : "gray";
  }

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => `${ent.id}.png`;

  const MapEntViewInner = ent instanceof Place ? MapPlaceView : MapRegionView;

  const isStale = lastEvent.isStale();

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
