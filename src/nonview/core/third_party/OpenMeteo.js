import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
export default class OpenMeteo {
  static async getData({ latLng }) {
    const utNow = TimeUtils.getUnixTime();
    const startHour = TimeUtils.formatISO8601(utNow - 86400);
    const endHour = TimeUtils.formatISO8601(utNow);

    const params = {
      latitude: latLng.lat,
      longitude: latLng.lng,

      current: ["temperature_2m", "precipitation"],
      hourly: ["temperature_2m", "precipitation"],

      start_hour: startHour,
      end_hour: endHour,

      timezone: "Asia/Colombo",

      precipitation_unit: "mm",
      temperature_unit: "celsius",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const hourly = response.hourly();
    const current = response.current();

    const weatherDataRaw = {
      current: {
        time: new Date(Number(current.time()) * 1000),
        temperature_2m: current.variables(0).value(),
        precipitation: current.variables(1).value(),
      },
      hourly: {
        time: Array.from(
          {
            length:
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval(),
          },
          (_, i) =>
            new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
        ),
        temperature_2m: hourly.variables(0).valuesArray(),
        precipitation: hourly.variables(1).valuesArray(),
      },
    };
    const weatherData = {
      elevationM: response.elevation(),
      temp2mCNow: weatherDataRaw.current.temperature_2m,
      temp2mCNowTimeUt: Number(current.time()),
      rainMM24h: weatherDataRaw.hourly.precipitation,
      rainMM24hTimeUt: weatherDataRaw.hourly.time.map(
        TimeUtils.getUnixTimeFromDate
      ),
      temp2mC: weatherDataRaw.hourly.temperature_2m.slice(-1)[0],
      rainMMMean24h: ArrayUtils.sum(weatherDataRaw.hourly.precipitation),
    };

    console.debug(weatherData);

    return weatherData;
  }
}
