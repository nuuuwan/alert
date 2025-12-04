import GaugingStationIcon from "./GaugingStationIcon";
import WeatherStationIcon from "./WeatherStationIcon";
import AdminRegionIcon from "./AdminRegionIcon";
import LocationIcon from "./LocationIcon";

export default class RoleIcon {
  static get(eventClassName) {
    return (
      {
        RiverWaterLevelMeasurement: GaugingStationIcon,
        WeatherReport: WeatherStationIcon,
        LandslideRegionAlert: AdminRegionIcon,
      }[eventClassName] || LocationIcon
    );
  }
}
