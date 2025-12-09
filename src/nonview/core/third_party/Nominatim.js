import WWW from "../../base/WWW";

export default class Nominatim {
  static async reverseGeocode(latLng) {
    const [lat, lon] = latLng.raw();
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    console.debug({ url });
    try {
      return await WWW.fetchJSON(url);
    } catch (error) {
      console.error("Failed to fetch reverse geocoding data:", error);
      return null;
    }
  }
}
