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
  if (RoleDetailsComponent) {
    return <RoleDetailsComponent ent={ent} eventList={eventList} />;
  }
  throw new Error(`Unknown role details for event class: ${eventClassName}`);
}
