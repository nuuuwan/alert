import HydrometricStationIcon from "./HydrometricStationIcon";
import WeatherStationIcon from "./WeatherStationIcon";
import AdminRegionIcon from "./AdminRegionIcon";
import LocationIcon from "./LocationIcon";

export default class RoleIcon {
  static get(eventClassName) {
    return (
      {
        RiverWaterLevelMeasurement: HydrometricStationIcon,
        WeatherReport: WeatherStationIcon,
        LandslideWarning: AdminRegionIcon,
      }[eventClassName] || LocationIcon
    );
  }
}
