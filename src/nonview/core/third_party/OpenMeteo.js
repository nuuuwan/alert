import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import { newTimedUnit } from "../units/TimedUnit";
import DataSource from "../DataSource";

export default class OpenMeteo {
  static getDataSource() {
    return new DataSource({
      label: "Open-Meteo Weather API",
      url: "https://open-meteo.com/en/docs",
    });
  }
  static async getRawData({ latLng }) {
    const utNow = TimeUtils.getUnixTime();
    const spanDays = 7;
    const startHour = TimeUtils.formatISO8601(utNow - spanDays * 86400);
    const endHour = TimeUtils.formatISO8601(utNow + spanDays * 86400);

    const currentFields = [
      "temperature_2m",
      "precipitation",
      "relative_humidity_2m",
      "dew_point_2m",
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

    // Extract temporary variables to avoid repetition
    const rainListNext24h = weatherDataRaw.hourly.precipitation.slice(
      7 * 24,
      8 * 24
    );
    const rainNext7d = weatherDataRaw.hourly.precipitation.slice(
      7 * 24,
      14 * 24
    );
    const rainListPrev24h = weatherDataRaw.hourly.precipitation.slice(
      6 * 24,
      7 * 24
    );
    const rainListPrev7d = weatherDataRaw.hourly.precipitation.slice(0, 7 * 24);
    const dewPointListNext24h = weatherDataRaw.hourly.dew_point_2m.slice(
      7 * 24,
      8 * 24
    );
    const tempListNext24h = weatherDataRaw.hourly.temperature_2m.slice(
      7 * 24,
      8 * 24
    );
    const soilMoistureDeepListNext24h =
      weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(7 * 24, 8 * 24);
    const soilMoistureDeepListNext7d =
      weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(7 * 24, 14 * 24);

    let weatherData = {
      elevationM: weatherDataRaw.elevation,
      // current
      tempNow: weatherDataRaw.current.temperature_2m,
      relativeHumidityNow: weatherDataRaw.current.relative_humidity_2m,
      dewPointNow: weatherDataRaw.current.dew_point_2m,
      timeUtNow: weatherDataRaw.current_time_ut,

      // hourly - dew point
      dewPointListHourly: weatherDataRaw.hourly.dew_point_2m,
      dewPointNext24hMax: Math.max(...dewPointListNext24h),
      rainHoursNext24hSum: rainListNext24h.filter((rain) => rain > 0).length,
      // hourly - rain
      rainHoursNext7dSum: rainNext7d.filter((rain) => rain > 0).length,
      rainListHourly: weatherDataRaw.hourly.precipitation,
      rainNext24hMax: Math.max(...rainListNext24h),
      rainNext24hSum: ArrayUtils.sum(rainListNext24h),
      rainNext7dSum: ArrayUtils.sum(rainNext7d),
      rainPrev24hSum: ArrayUtils.sum(rainListPrev24h),
      rainPrev7dSum: ArrayUtils.sum(rainListPrev7d),
      // hourly - soil moisture
      soilMoistureDeepNext24hMean: ArrayUtils.mean(soilMoistureDeepListNext24h),
      soilMoistureDeepNext7dMean: ArrayUtils.mean(soilMoistureDeepListNext7d),
      // hourly - temperature
      tempListHourly: weatherDataRaw.hourly.temperature_2m,
      tempNext24hMin: Math.min(...tempListNext24h),
      tempNext24hMax: Math.max(...tempListNext24h),
      tempNext24hMean: ArrayUtils.mean(tempListNext24h),
      // hourly - time
      timeUtListHourly: weatherDataRaw.hourly_time_ut,
    };

    return weatherData;
  }

  static getDroughtRiskScore({ openMeteoData }) {
    return new AlertScore({
      name: "Drought",
      timeLabel: "Next 7d",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainPrev7dSum"),
          condition: (value) => value < 0.1,
          conditionDescription: "< 0.1",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext7dSum"),
          condition: (value) => value < 0.1,
          conditionDescription: "< 0.1",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainHoursNext7dSum"),
          condition: (value) => value < 1,
          conditionDescription: "< 1",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(
            openMeteoData,
            "soilMoistureDeepNext7dMean"
          ),
          condition: (value) => value < 0.05,
          conditionDescription: "< 0.05",
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
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "tempNext24hMax"),
          condition: (value) => value > 35,
          conditionDescription: "> 35",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "tempNext24hMean"),
          condition: (value) => value > 30,
          conditionDescription: "> 30",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "dewPointNext24hMax"),
          condition: (value) => value > 25,
          conditionDescription: "> 25",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
      ],
    });
  }
}
