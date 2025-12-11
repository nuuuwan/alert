import WWW from "../../base/WWW";
import Cache from "../../base/Cache";
export default class Nominatim {
  static async reverseGeocode(latLng) {
    const [lat, lon] = latLng.raw();
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
      return await Cache.get(
        `Nominatim.reverseGeocode.${latLng.id}`,
        async () => {
          return await WWW.fetchJSON(url);
        }
      );
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
    try {
      return await Cache.get(`Nominatim.search.${query}`, async () => {
        return await WWW.fetchJSON(url);
      });
    } catch (error) {
      console.error("Failed to fetch search data:", error);
      return [];
    }
  }
}
