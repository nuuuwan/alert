import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
export default class OpenMeteo {
  static getTestData() {
    return {
      elevationM: 150,
      // current
      currentTempCelsius: 28.5,
      currentRH: 75,
      currentTimeUt: TimeUtils.getUnixTime() - 600,

      // hourly
      hourlyTimeUt: Array.from(
        { length: 48 },
        (_, i) => TimeUtils.getUnixTime() - 3600 * (48 - i)
      ),

      hourlyTemp: Array.from({ length: 48 }, () => 25 + Math.random() * 10),

      hourlyRain: Array.from({ length: 48 }, (_, i) =>
        i < 24 ? Math.random() * 5 : Math.random() * 20
      ),
      hourlyRainSumLast24Hours: 60,
      hourlyRainSumNext24Hours: 120,

      hourlyRainHourCountNext24Hours: 8,
      hourlyRainProb: Array.from({ length: 24 }, () => Math.random() * 100),
      maxHourlyRainProb: 85,

      meanSoilMoistureTopLayerNext24h: 0.4,
      meanSoilMoistureDeepLayerNext24h: 0.6,

      meanSoilTempNext24h: 30,

      hourlyWindGusts: Array.from(
        { length: 48 },
        () => 20 + Math.random() * 40
      ),
      meanHourlyWindGustsNext24h: 35,
    };
  }

  static async getRawData({ latLng }) {
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
        "soil_temperature_18cm",
        "wind_gusts_10m",
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
      elevation: response.elevation(),
      current_time_ut: Number(current.time()),
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
        soil_temperature_18cm: hourly.variables(5).valuesArray(),
        wind_gusts_10m: hourly.variables(6).valuesArray(),
      },
    };
    return weatherDataRaw;
  }

  static async getData({ latLng, isTest = true }) {
    if (isTest) {
      console.warn("Using OpenMeteo test data for: ", latLng.raw());
      return this.getTestData();
    }

    const weatherDataRaw = await OpenMeteo.getRawData({ latLng });
    let weatherData = {
      elevationM: weatherDataRaw.elevation,
      // current
      currentTempCelsius: weatherDataRaw.current.temperature_2m,
      currentRH: weatherDataRaw.current.relative_humidity_2m,
      currentTimeUt: weatherDataRaw.current_time_ut,

      // hourly
      hourlyTimeUt: weatherDataRaw.hourly.time.map(
        TimeUtils.getUnixTimeFromDate
      ),

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

    return weatherData;
  }
}
