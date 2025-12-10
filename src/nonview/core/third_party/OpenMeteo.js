import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
import SystemMode from "../../base/SystemMode";
import WWW from "../../base/WWW";
export default class OpenMeteo {
  static async getRawData({ latLng }) {
    if (SystemMode.isTest()) {
      console.warn("🧪 [TestMode] OpenMeteo.getRawData", latLng.raw());
      return await WWW.fetch(
        process.env.PUBLIC_URL + `/test_data/open_meteo_raw_data.json`
      );
    }

    const utNow = TimeUtils.getUnixTime();
    const spanDays = 7;
    const startHour = TimeUtils.formatISO8601(utNow - spanDays * 86400);
    const endHour = TimeUtils.formatISO8601(utNow + spanDays * 86400);

    const currentFields = [
      "temperature_2m",
      "precipitation",
      "relative_humidity_2m",
    ];
    const hourlyFields = [
      "temperature_2m",
      "precipitation",
      "precipitation_probability",
      "soil_moisture_0_to_1cm",
      "soil_moisture_27_to_81cm",
      "soil_temperature_18cm",
      "wind_gusts_10m",
    ];

    const params = {
      latitude: latLng.lat,
      longitude: latLng.lng,

      current: currentFields,
      hourly: hourlyFields,

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
    const elevation = response.elevation();

    const weatherDataRaw = {
      elevation,
      current_time_ut: Number(current.time()),
      current: Object.fromEntries(
        currentFields.map((field, index) => [
          field,
          current.variables(index).value(),
        ])
      ),
      hourly_time_ut: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) => (Number(hourly.time()) + i * hourly.interval()) * 1000
      ),
      hourly: Object.fromEntries(
        hourlyFields.map((field, index) => [
          field,
          Object.values(hourly.variables(index).valuesArray()),
        ])
      ),
    };
    return weatherDataRaw;
  }

  static async getData({ latLng }) {
    const weatherDataRaw = await OpenMeteo.getRawData({ latLng });
    let weatherData = {
      elevationM: weatherDataRaw.elevation,
      // current
      currentTempCelsius: weatherDataRaw.current.temperature_2m,
      currentRH: weatherDataRaw.current.relative_humidity_2m,
      currentTimeUt: weatherDataRaw.current_time_ut,

      // hourly
      hourlyTimeUt: weatherDataRaw.hourly_time_ut,
      hourlyTemp: weatherDataRaw.hourly.temperature_2m,
      hourlyRain: weatherDataRaw.hourly.precipitation,
      hourlyRainSumLast24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(6 * 24, 7 * 24)
      ),
      hourlyRainSumNext24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(7 * 24, 8 * 24)
      ),
    };

    weatherData = OpenMeteo.computeFloodRisk(weatherData);
    weatherData = OpenMeteo.computeLandslideRisk(weatherData);

    return weatherData;
  }

  static computeLandslideRisk(weatherData) {
    weatherData.landslideRiskScore = 0;
    weatherData.landslideRiskAlertLevel = 0;
    weatherData.landslideRiskLabel = "TODO";

    return weatherData;
  }

  static computeFloodRisk(weatherData) {
    weatherData.floodRiskScore = 0;
    weatherData.floodRiskAlertLevel = 0;
    weatherData.floodRiskLabel = "TODO";

    weatherData.floodRiskFactors24h = {
      f01PeakRainFallIntensity: Math.max(...weatherData.hourlyRain),
      f02CumulativeRainfall24Hours: weatherData.hourlyRainSumNext24Hours,
    };
    console.debug(weatherData.floodRiskFactors24h);
    return weatherData;
  }
}
