import LatLng from "./geos/LatLng.js";
export default class GeoLocation {
  static async getCurrentLatLng() {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return null;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ 
            latLng: LatLng.fromRaw([latitude, longitude]),
            isDefault: false
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // return the default location(colombo) to avoid runtime error
          resolve({
            latLng: LatLng.fromRaw([6.9271, 79.8612]),
            isDefault: true,
            error: error.message
          });
        },
      );
    });
  }
}
