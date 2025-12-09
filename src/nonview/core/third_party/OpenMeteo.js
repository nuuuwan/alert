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
      hourly: [
        "temperature_2m",
        "precipitation",
        "precipitation_probability",
        "soil_moisture_0_to_1cm",
        "soil_moisture_27_to_81cm",
      ],

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
        soil_moisture_0_to_1cm: hourly.variables(3).valuesArray(),
        soil_moisture_27_to_81cm: hourly.variables(4).valuesArray(),
      },
    };
    let weatherData = {
      elevationM: response.elevation(),
      // current
      currentTempCelsius: weatherDataRaw.current.temperature_2m,
      currentRH: weatherDataRaw.current.relative_humidity_2m,
      currentTimeUt: Number(current.time()),

      // hourly
      hourlyTimeUt: weatherDataRaw.hourly.time.map(
        TimeUtils.getUnixTimeFromDate
      ),

      hourlyTempCelsius: weatherDataRaw.hourly.temperature_2m,

      hourlyPrecipitationMM: weatherDataRaw.hourly.precipitation,
      hourlyPrecipitationMMSumLast24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(0, 24)
      ),
      hourlyPrecipitationMMSumNext24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(24, 48)
      ),

      hourlyPrecipitationMMHourCountNext24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation
          .slice(24, 48)
          .map((v) => (v > 0 ? 1 : 0))
      ),
      hourlyPrecipitationProb:
        weatherDataRaw.hourly.precipitation_probability.slice(24, 48),
      maxHourlyPrecipitationProb: ArrayUtils.max(
        weatherDataRaw.hourly.precipitation_probability.slice(24, 48)
      ),

      meanSoilMoistureTopLayerNext24h: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_moisture_0_to_1cm.slice(24, 48)
      ),
      meanSoilMoistureDeepLayerNext24h: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(24, 48)
      ),
    };

    weatherData.floodRiskScore =
      weatherData.hourlyPrecipitationMMSumNext24Hours *
        (weatherData.meanSoilMoistureTopLayerNext24h +
          weatherData.meanSoilMoistureDeepLayerNext24h * 0.5) +
      0.2 *
        weatherData.hourlyPrecipitationMMHourCountNext24Hours *
        weatherData.meanSoilMoistureTopLayerNext24h +
      0.1 * weatherData.maxHourlyPrecipitationProb;

    weatherData.floodRiskAlertLevel = 0;
    if (weatherData.floodRiskScore >= 75) {
      weatherData.floodRiskAlertLevel = 3;
    } else if (weatherData.floodRiskScore >= 50) {
      weatherData.floodRiskAlertLevel = 2;
    } else if (weatherData.floodRiskScore >= 25) {
      weatherData.floodRiskAlertLevel = 1;
    }

    return weatherData;
  }
}
