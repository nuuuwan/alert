import TimeUtils from "../../base/TimeUtils";
import { fetchWeatherApi } from "openmeteo";
import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import { newTimedUnit } from "../units/TimedUnit";
import DataSource from "../DataSource";

export default class OpenMeteoAirQuality {
  static getDataSource() {
    return new DataSource({
      label: "Open-Meteo Air Quality API",
      url: "https://open-meteo.com/en/docs/air-quality-api",
    });
  }

  static async getRawData({ latLng }) {
    const utNow = TimeUtils.getUnixTime();
    const spanDays = 1;
    const startHour = TimeUtils.formatISO8601(utNow - spanDays * 86400);
    const endHour = TimeUtils.formatISO8601(utNow + spanDays * 86400);

    const hourlyFields = ["us_aqi"];

    const currentFields = ["us_aqi"];

    const params = {
      latitude: latLng.lat,
      longitude: latLng.lng,
      current: currentFields,
      hourly: hourlyFields,
      start_hour: startHour,
      end_hour: endHour,
      timezone: "Asia/Colombo",
    };

    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const hourly = response.hourly();
    const current = response.current();

    const airQualityDataRaw = {
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

    return airQualityDataRaw;
  }

  static async getData({ latLng }) {
    const airQualityDataRaw = await OpenMeteoAirQuality.getRawData({ latLng });

    const usAqiMax = Math.max(...airQualityDataRaw.hourly.us_aqi);

    let airQualityData = {
      usAqiMax24h: usAqiMax,
      timeUtNow: airQualityDataRaw.current_time_ut,
    };

    return airQualityData;
  }

  static getAirQualityScore({ airQualityData }) {
    const dataSource = OpenMeteoAirQuality.getDataSource();

    return new AlertScore({
      name: "Air Quality",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(airQualityData, "usAqiMax24h"),
          condition: (value) => value > 100,
          conditionDescription: "> 100",
          source: dataSource,
        }),
      ],
    });
  }
}
