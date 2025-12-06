import RiverStationIcon from "./RiverStationIcon";
import WeatherStationIcon from "./WeatherStationIcon";
import AdminRegionIcon from "./AdminRegionIcon";
import LocationIcon from "./LocationIcon";

export default class RoleIcon {
  static get(eventClassName) {
    return (
      {
        RiverWaterLevelMeasurement: RiverStationIcon,
        WeatherReport: WeatherStationIcon,
        LandslideWarning: AdminRegionIcon,
      }[eventClassName] || LocationIcon
    );
  }
}
