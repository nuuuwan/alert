import { useEffect, useState } from "react";
import CustomDrawer from "../moles/CustomDrawer";
import EntDetails from "../moles/EntDetails";
import MapPlaceView from "../moles/MapPlaceView";
import MapRegionView from "../moles/MapRegionView";
import Place from "../../nonview/core/ents/Place";
import RiverWaterLevelMeasurement from "../../nonview/core/events/RiverWaterLevelMeasurement";
import LandslideWarning from "../../nonview/core/events/LandslideWarning";
import WeatherReport from "../../nonview/core/events/WeatherReport";

export default function MapEntView({ ent }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventClassNameToEventList, setEventClassNameToEventList] = useState(
    {}
  );
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const eventClasses = [
        RiverWaterLevelMeasurement,
        LandslideWarning,
        WeatherReport,
      ];

      const eventClassNameToEventList2 = Object.fromEntries(
        await Promise.all(
          eventClasses.map(async (EventClass) => {
            const eventList = await EventClass.listForId(ent.id);
            return [EventClass.getEventTypeName(), eventList];
          })
        )
      );
      setEventClassNameToEventList(eventClassNameToEventList2);
      setLoaded(true);
    }

    fetchData();
  }, [ent.id]);

  if (!loaded) {
    return null;
  }

  const nEvents = Object.values(eventClassNameToEventList).reduce(
    (sum, eventList) => sum + eventList.length,
    0
  );
  if (nEvents === 0) {
    return null;
  }

  const entColor = "black";

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
