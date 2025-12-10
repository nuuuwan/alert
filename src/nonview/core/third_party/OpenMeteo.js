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
        weatherDataRaw.hourly.precipitation.slice(0, 24)
      ),
      hourlyRainSumNext24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(24, 48)
      ),

      hourlyRainHourCountNext24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation
          .slice(24, 48)
          .map((v) => (v > 0 ? 1 : 0))
      ),
      hourlyRainProb: weatherDataRaw.hourly.precipitation_probability.slice(
        24,
        48
      ),
      maxHourlyRainProb: ArrayUtils.max(
        weatherDataRaw.hourly.precipitation_probability.slice(24, 48)
      ),

      meanSoilMoistureTopLayerNext24h: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_moisture_0_to_1cm.slice(24, 48)
      ),
      meanSoilMoistureDeepLayerNext24h: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(24, 48)
      ),

      meanSoilTempNext24h: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_temperature_18cm.slice(24, 48)
      ),

      hourlyWindGusts: weatherDataRaw.hourly.wind_gusts_10m,
      meanHourlyWindGustsNext24h: ArrayUtils.mean(
        weatherDataRaw.hourly.wind_gusts_10m.slice(24, 48)
      ),
    };

    weatherData = OpenMeteo.computeFloodRisk(weatherData);
    weatherData = OpenMeteo.computeLandslideRisk(weatherData);

    return weatherData;
  }

  static computeLandslideRisk(weatherData) {
    const R_MAX = 200; // mm, strong 24 h rainfall
    const W_MAX = 80; // km/h, strong monsoon gusts
    const T_MAX = 35; // °C, typical max soil temperature

    const W_R = 0.45;
    const W_M = 0.35;
    const W_W = 0.1;
    const W_T = 0.05;
    const W_H = 0.05;

    // --- Normalised variables ---
    const Rn = weatherData.hourlyRainSumNext24Hours / R_MAX;
    const Mn = weatherData.meanSoilMoistureDeepLayerNext24h; // already 0–1
    const Wn = weatherData.meanHourlyWindGustsNext24h / W_MAX;
    const Tn = Math.min(1, weatherData.meanSoilTempNext24h / T_MAX);
    const Hn = weatherData.currentRH / 100; // convert to 0–1

    // --- Landslide Risk Score (0–1 range) ---
    weatherData.landslideRiskScore =
      W_R * Rn + W_M * Mn + W_W * Wn + W_T * Tn + W_H * Hn;

    // --- Map score to alert level (0–3) ---
    weatherData.landslideRiskAlertLevel = 0;
    if (weatherData.landslideRiskScore >= 0.7) {
      weatherData.landslideRiskAlertLevel = 3;
    } else if (weatherData.landslideRiskScore >= 0.5) {
      weatherData.landslideRiskAlertLevel = 2;
    } else if (weatherData.landslideRiskScore >= 0.3) {
      weatherData.landslideRiskAlertLevel = 1;
    }

    weatherData.landslideRiskLabel = [
      "No Risk",
      "Low Risk",
      "Medium Risk",
      "High Risk",
    ][weatherData.landslideRiskAlertLevel];

    return weatherData;
  }

  static computeFloodRisk(weatherData) {
    weatherData.floodRiskScore =
      weatherData.hourlyRainSumNext24Hours *
        (weatherData.meanSoilMoistureTopLayerNext24h +
          weatherData.meanSoilMoistureDeepLayerNext24h * 0.5) +
      0.2 *
        weatherData.hourlyRainHourCountNext24Hours *
        weatherData.meanSoilMoistureTopLayerNext24h +
      0.1 * weatherData.maxHourlyRainProb;

    weatherData.floodRiskAlertLevel = 0;
    if (weatherData.floodRiskScore >= 75) {
      weatherData.floodRiskAlertLevel = 3;
    } else if (weatherData.floodRiskScore >= 50) {
      weatherData.floodRiskAlertLevel = 2;
    } else if (weatherData.floodRiskScore >= 25) {
      weatherData.floodRiskAlertLevel = 1;
    }

    weatherData.floodRiskLabel = [
      "No Risk",
      "Low Risk",
      "Medium Risk",
      "High Risk",
    ][weatherData.floodRiskAlertLevel];

    // Factors

    weatherData.floodRiskFactors24h = {
      f01PeakRainFallIntensity: Math.max(...weatherData.hourlyRain),
      f02cumulativeRainfall: weatherData.hourlyRainSumNext24Hours,
    };

    return weatherData;
  }
}
