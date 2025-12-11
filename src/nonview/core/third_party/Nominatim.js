import WWW from "../../base/WWW";
import SystemMode from "../../base/SystemMode";
import Cache from "../../base/Cache";
export default class Nominatim {
  static getTestData() {
    return {
      display_name: "Test Place, Test City",
    };
  }

  static async reverseGeocode(latLng) {
    if (SystemMode.isTest()) {
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

  static async search(query) {
    if (!query || query.trim().length === 0) {
      return [];
    }
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=jsonv2&countrycodes=lk`;
    console.debug(url);
    try {
      return await Cache.get(`Nominatim.Search_${query}`, async () => {
        return await WWW.fetchJSON(url);
      });
    } catch (error) {
      console.error("Failed to fetch search data:", error);
      return [];
    }
  }
}
