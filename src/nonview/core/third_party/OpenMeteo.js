import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
export default class OpenMeteo {
  static async getData({ latLng }) {
    const utNow = TimeUtils.getUnixTime();
    const startHour = TimeUtils.formatISO8601(utNow - 86400);
    const endHour = TimeUtils.formatISO8601(utNow + 86400);

    const params = {
      latitude: latLng.lat,
      longitude: latLng.lng,

      current: ["temperature_2m", "precipitation", "relative_humidity_2m"],
      hourly: ["temperature_2m", "precipitation", "precipitation_probability"],

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
        relative_humidity_2m: current.variables(2).value(),
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
        precipitation_probability: hourly.variables(2).valuesArray(),
      },
    };
    const weatherData = {
      elevationM: response.elevation(),
      // current
      temp2mCNow: weatherDataRaw.current.temperature_2m,
      relativeHumadityNow: weatherDataRaw.current.relative_humidity_2m,
      currentTimeUt: Number(current.time()),

      // hourly
      hourlyTimeUt: weatherDataRaw.hourly.time.map(
        TimeUtils.getUnixTimeFromDate
      ),

      temp2mC24h: weatherDataRaw.hourly.temperature_2m,

      rainMM24h: weatherDataRaw.hourly.precipitation,
      rainMMSumActualPrevious24h: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(0, 24)
      ),
      rainMMSumPredictedNext24h: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(24, 48)
      ),

      rainHoursNext24h: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation
          .slice(24, 48)
          .map((v) => (v > 0 ? 1 : 0))
      ),
      rainProbNext24h: weatherDataRaw.hourly.precipitation_probability.slice(
        24,
        48
      ),
      rainProbNext24hMax: Math.max(
        ...weatherDataRaw.hourly.precipitation_probability.slice(24, 48)
      ),
    };

    console.debug(weatherData);

    return weatherData;
  }
}
