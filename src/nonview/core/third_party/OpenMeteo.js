import { fetchWeatherApi } from "openmeteo";
export default class OpenMeteo {
  static async getData({ latLng }) {
    const params = {
      latitude: latLng.lat,
      longitude: latLng.lng,
      hourly: ["temperature_2m", "rain"],

      timezone: "Asia/Colombo",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const hourly = response.hourly();

    const weatherData = {
      hourly: {
        temperature_2m: hourly.variables(0).valuesArray(),
        rain: hourly.variables(1).valuesArray(),
      },
    };
    return weatherData;
  }
}
