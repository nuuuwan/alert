import GaugingStationDetails from "./gauging_station/GaugingStationDetails";
import WeatherStationDetails from "./weather_station/WeatherStationDetails";
import LandslideRegionDetails from "./landslide_area/LandslideRegionDetails";

function getRoleDetailsComponent(eventClassName) {
  return {
    RiverWaterLevelMeasurement: GaugingStationDetails,
    WeatherReport: WeatherStationDetails,
    LandslideWarning: LandslideRegionDetails,
  }[eventClassName];
}

export default function RoleDetails({ eventClassName, ent, eventList }) {
  const RoleDetailsComponent = getRoleDetailsComponent(eventClassName);
  const mostRecentEvent = eventList[eventList.length - 1];
  const isStale = !mostRecentEvent.isWithinValidityWindow();

  return (
    <RoleDetailsComponent ent={ent} eventList={eventList} isStale={isStale} />
  );
}
