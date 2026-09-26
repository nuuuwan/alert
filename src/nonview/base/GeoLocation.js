import LatLng from "./geos/LatLng.js";
import { DEFAULT_CENTER } from "../cons/MapConstants.js";
export default class GeoLocation {
  static async getCurrentLatLng() {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return null;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(LatLng.fromRaw([latitude, longitude]));
        },
        (error) => {
          console.warn(
            "Using the default location because geolocation failed:",
            error,
          );
          resolve(LatLng.fromRaw(DEFAULT_CENTER));
        },
      );
    });
  }
}
