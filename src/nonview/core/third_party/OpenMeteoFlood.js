import { fetchWeatherApi } from "openmeteo";
import Cache from "../../base/Cache.js";
export default class OpenMeteoFlood {
  static async getData(latLng) {
    const weatherDataJSON = await Cache.get(
      `OpenMeteoFlood-${latLng.lat}-${latLng.lng}`,
      async () => {
        const [latitude, longitude] = latLng.raw();

        const params = {
          latitude,
          longitude,
          daily: "river_discharge",
          forecast_days: 1,

          //
          timezone: "Asia/Colombo",
          precipitation_unit: "mm",
          temperature_unit: "celsius",
        };
        const url = "https://flood-api.open-meteo.com/v1/flood";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const daily = response.daily();
        const weatherData = {
          riverLatLngRaw: [response.latitude(), response.longitude()],
          daily: {
            timeUt: Array.from(
              {
                length:
                  (Number(daily.timeEnd()) - Number(daily.time())) /
                  daily.interval(),
              },
              (_, i) => Number(daily.time()) + i * daily.interval()
            ),
            riverDischarge: Object.values(daily.variables(0).valuesArray()),
          },
        };

        const weatherDataJSON = JSON.stringify(weatherData);
        return weatherDataJSON;
      }
    );
    const weatherData = JSON.parse(weatherDataJSON);
    return weatherData;
  }
}
