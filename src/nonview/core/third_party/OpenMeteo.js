import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import { newTimedUnit } from "../units/TimedUnit";
import DataSource from "../DataSource";

export default class OpenMeteo {
  static SPAN_DAYS_BEFORE = 28;
  static SPAN_DAYS_AFTER = 14;

  static getDataSource() {
    return new DataSource({
      label: "Open-Meteo Weather API",
      url: "https://open-meteo.com/en/docs",
    });
  }
  static async getRawData({ latLng }) {
    const utNow = TimeUtils.getUnixTime();

    const startHour = TimeUtils.formatISO8601(
      utNow - OpenMeteo.SPAN_DAYS_BEFORE * 86400,
    );
    const endHour = TimeUtils.formatISO8601(
      utNow + OpenMeteo.SPAN_DAYS_AFTER * 86400,
    );

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
        ]),
      ),
      hourly_time_ut: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) => Number(hourly.time()) + i * hourly.interval(),
      ),
      hourly: Object.fromEntries(
        hourlyFields.map((field, index) => [
          field,
          Object.values(hourly.variables(index).valuesArray()),
        ]),
      ),
    };
    return weatherDataRaw;
  }

  static async getData({ latLng }) {
    const weatherDataRaw = await OpenMeteo.getRawData({ latLng });

    // Calculate indices based on SPAN_DAYS_BEFORE and SPAN_DAYS_AFTER
    const nowIndex = OpenMeteo.SPAN_DAYS_BEFORE * 24;
    const next24hEnd = (OpenMeteo.SPAN_DAYS_BEFORE + 1) * 24;
    const next7dEnd = (OpenMeteo.SPAN_DAYS_BEFORE + 7) * 24;
    const next14dEnd = (OpenMeteo.SPAN_DAYS_BEFORE + 14) * 24;
    const prev24hStart = (OpenMeteo.SPAN_DAYS_BEFORE - 1) * 24;
    const prev7dStart = (OpenMeteo.SPAN_DAYS_BEFORE - 7) * 24;
    const prev28dStart = (OpenMeteo.SPAN_DAYS_BEFORE - 28) * 24;

    // Extract temporary variables to avoid repetition
    const rainListNext24h = weatherDataRaw.hourly.precipitation.slice(
      nowIndex,
      next24hEnd,
    );
    const rainNext7d = weatherDataRaw.hourly.precipitation.slice(
      nowIndex,
      next7dEnd,
    );
    const rainNext14d = weatherDataRaw.hourly.precipitation.slice(
      nowIndex,
      next14dEnd,
    );
    const rainListPrev24h = weatherDataRaw.hourly.precipitation.slice(
      prev24hStart,
      nowIndex,
    );
    const rainListPrev7d = weatherDataRaw.hourly.precipitation.slice(
      prev7dStart,
      nowIndex,
    );
    const rainListPrev28d = weatherDataRaw.hourly.precipitation.slice(
      prev28dStart,
      nowIndex,
    );
    const dewPointListNext24h = weatherDataRaw.hourly.dew_point_2m.slice(
      nowIndex,
      next24hEnd,
    );
    const tempListNext24h = weatherDataRaw.hourly.temperature_2m.slice(
      nowIndex,
      next24hEnd,
    );
    const soilMoistureDeepListNext24h =
      weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(
        nowIndex,
        next24hEnd,
      );
    const soilMoistureDeepListNext7d =
      weatherDataRaw.hourly.soil_moisture_27_to_81cm.slice(nowIndex, next7dEnd);

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
      rainHoursNext14dSum: rainNext14d.filter((rain) => rain > 0).length,
      rainListHourly: weatherDataRaw.hourly.precipitation,
      rainNext24hMax: Math.max(...rainListNext24h),
      rainNext24hSum: ArrayUtils.sum(rainListNext24h),
      rainNext7dSum: ArrayUtils.sum(rainNext7d),
      rainNext14dSum: ArrayUtils.sum(rainNext14d),
      rainPrev24hSum: ArrayUtils.sum(rainListPrev24h),
      rainPrev7dSum: ArrayUtils.sum(rainListPrev7d),
      rainPrev28dSum: ArrayUtils.sum(rainListPrev28d),
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
      timeLabel: "Next 14d",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainPrev28dSum"),
          condition: (value) => value < 0.1,
          conditionDescription: "< 0.1",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext14dSum"),
          condition: (value) => value < 0.1,
          conditionDescription: "< 0.1",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainHoursNext14dSum"),
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
            "soilMoistureDeepNext7dMean",
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
          condition: (value) => value > 26,
          conditionDescription: "> 26",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
      ],
    });
  }
}
