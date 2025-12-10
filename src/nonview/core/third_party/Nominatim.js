import WWW from "../../base/WWW";
import SystemMode from "../../base/SystemMode";
export default class Nominatim {
  static getTestData() {
    return {
      display_name: "Test Place, Test City",
    };
  }

  static async reverseGeocode(latLng) {
    if (SystemMode.isTest()) {
      console.warn("[Nominatim] Test Mode:", latLng.raw());
      return this.getTestData();
    }
    const [lat, lon] = latLng.raw();
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
      return await WWW.fetchJSON(url);
    } catch (error) {
      console.error("Failed to fetch reverse geocoding data:", error);
      return null;
    }
  }
}
