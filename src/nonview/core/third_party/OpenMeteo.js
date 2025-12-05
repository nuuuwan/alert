import { fetchWeatherApi } from "openmeteo";
export default class OpenMeteo {
  static async getData({ latLng }) {
    const params = {
      latitude: latLng[0],
      longitude: latLng[1],
      hourly: "temperature_2m",
      timezone: "Asia/Colombo",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    return {
      elevation: response.elevation(),
    };
  }
}
