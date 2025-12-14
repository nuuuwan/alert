import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
import SystemMode from "../../base/SystemMode";
import WWW from "../../base/WWW";
import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import Rain from "../units/Rain";
import SoilMoisture from "../units/SoilMoisture";
import Temperature from "../units/Temperature";
import DewPoint from "../units/DewPoint";
import TimedUnit from "../units/TimedUnit";
import RainHours from "../units/RainHours";
export default class OpenMeteo {
  static getSourceList(latLng) {
    const [latitude, longitude] = latLng.raw();
    return [
      {
        label: "Open-Meteo (Real-Time Weather API)",
        url: `https://open-meteo.com/en/docs?latitude=${latitude}&longitude=${longitude}`,
      },
    ];
  }
  static async getRawData({ latLng }) {
    if (SystemMode.isTest()) {
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
      "dew_point_2m",
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
        (_, i) => Number(hourly.time()) + i * hourly.interval()
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

      // hourly - dew point
      dewPointListHourly: weatherDataRaw.hourly.dew_point_2m,
      dewPointNext24hMax: Math.max(
        ...weatherDataRaw.hourly.dew_point_2m.slice(7 * 24, 8 * 24)
      ),
      rainHoursNext24hSum: weatherDataRaw.hourly.precipitation
        .slice(7 * 24, 8 * 24)
        .filter((rain) => rain > 0).length,
      // hourly - rain
      rainHoursNext7dSum: weatherDataRaw.hourly.precipitation
        .slice(7 * 24, 14 * 24)
        .filter((rain) => rain > 0).length,
      rainListHourly: weatherDataRaw.hourly.precipitation,
      rainNext24hMax: Math.max(
        ...weatherDataRaw.hourly.precipitation.slice(7 * 24, 8 * 24)
      ),
      rainNext24hSum: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(7 * 24, 8 * 24)
      ),
      rainNext7dSum: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(7 * 24, 14 * 24)
      ),
      rainPrev24hSum: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(6 * 24, 7 * 24)
      ),
      rainPrev7dSum: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(0, 7 * 24)
      ),
      // hourly - soil moisture
      soilMoistureDeepNext24hMean: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(7 * 24, 8 * 24)
      ),
      soilMoistureDeepNext7dMean: ArrayUtils.mean(
        weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(7 * 24, 14 * 24)
      ),
      // hourly - temperature
      tempListHourly: weatherDataRaw.hourly.temperature_2m,
      tempNext24hMax: Math.max(
        ...weatherDataRaw.hourly.temperature_2m.slice(7 * 24, 8 * 24)
      ),
      tempNext24hMean: ArrayUtils.mean(
        weatherDataRaw.hourly.temperature_2m.slice(7 * 24, 8 * 24)
      ),
      // hourly - time
      timeUtListHourly: weatherDataRaw.hourly_time_ut,
    };

    return weatherData;
  }

  static getDroughtRiskScore({ openMeteoData }) {
    return new AlertScore({
      name: "Drought",
      description: "Risk of the location experiencing a drought event.",
      timeLabel: "Next 7d",
      metricList: [
        new AlertScoreMetric({
          name: "Rain Last 7 Days",
          description: "Total rainfall recorded in the previous 7d.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Prev. 7d sum",
            unitValue: new Rain(openMeteoData.rainPrev7dSum),
          }),
          condition: (value) => value < 0.1,
          conditionDescription: "Total rainfall less than 0.1 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Rain Next 7 Days",
          description: "Forecasted rainfall for the next 7d.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 7d sum",
            unitValue: new Rain(openMeteoData.rainNext7dSum),
          }),
          condition: (value) => value < 0.1,
          conditionDescription: "Forecasted rainfall less than 0.1 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Soil Moisture",
          description: "Mean deep soil moisture for the next 7d.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 7d mean",
            unitValue: new SoilMoisture(
              openMeteoData.soilMoistureDeepNext7dMean
            ),
          }),
          condition: (value) => value < 0.25,
          conditionDescription: "Mean deep soil moisture less than 0.25",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "No Rain Hours",
          description: "Hours with no rainfall in the next 7d.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 7d sum",
            unitValue: new RainHours(openMeteoData.rainHoursNext7dSum),
          }),
          condition: (value) => value > 0,
          conditionDescription: "Hours with no rainfall greater than 0",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
      ],
    });
  }

  static getHeatRiskScore({ openMeteoData }) {
    return new AlertScore({
      name: "Heat",
      description: "Risk of the location experiencing a heat event.",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          name: "Max Temperature",
          description: "Maximum temperature forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h max",
            unitValue: new Temperature(openMeteoData.tempNext24hMax),
          }),
          condition: (value) => value > 35,
          conditionDescription: "Maximum temperature greater than 35°C",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Mean Temperature",
          description: "Mean temperature forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h mean",
            unitValue: new Temperature(openMeteoData.tempNext24hMean),
          }),
          condition: (value) => value > 30,
          conditionDescription: "Mean temperature greater than 30°C",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Max Dew Point",
          description: "Maximum dew point forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h max",
            unitValue: new DewPoint(openMeteoData.dewPointNext24hMax),
          }),
          condition: (value) => value > 25,
          conditionDescription: "Maximum dew point greater than 25°C",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
      ],
    });
  }
}
