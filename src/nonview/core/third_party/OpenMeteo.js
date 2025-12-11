import { fetchWeatherApi } from "openmeteo";
import TimeUtils from "../../base/TimeUtils";
import ArrayUtils from "../../base/ArrayUtils";
import SystemMode from "../../base/SystemMode";
import WWW from "../../base/WWW";
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

      // hourly
      hourlyTimeUt: weatherDataRaw.hourly_time_ut,
      hourlyTemp: weatherDataRaw.hourly.temperature_2m,
      hourlyRain: weatherDataRaw.hourly.precipitation,
      hourlyRainSumLast24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(6 * 24, 7 * 24)
      ),
      hourlyRainSumPrevious7Days: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(0, 7 * 24)
      ),
      hourlyRainSumNext7Days: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(7 * 24, 14 * 24)
      ),
      hourlyRainSumNext24Hours: ArrayUtils.sum(
        weatherDataRaw.hourly.precipitation.slice(7 * 24, 8 * 24)
      ),
      hourlyDeepSoilMoisture: weatherDataRaw.hourly.soil_moisture_27_to_81cm,
      hourlyDewPoint: weatherDataRaw.hourly.dew_point_2m,
    };

    weatherData = OpenMeteo.computeFloodRisk(weatherData);
    weatherData = OpenMeteo.computeLandslideRisk(weatherData);
    weatherData = OpenMeteo.computerHeatRisk(weatherData);
    weatherData = OpenMeteo.computeDroughtRisk(weatherData);

    return weatherData;
  }

  static computeFloodRisk(weatherData) {
    weatherData.floodRiskFactors24h = {
      f01PeakRainFallIntensity: Math.max(...weatherData.hourlyRain),
      f02HourlyRainSumNext24Hours: weatherData.hourlyRainSumNext24Hours,
      f03HoursOfRainNext24Hours: weatherData.hourlyRain
        .slice(7 * 24, 8 * 24)
        .filter((rain) => rain > 1).length,
      f04MeanDeepSoilMoistureNext24Hours: ArrayUtils.mean(
        weatherData.hourlyDeepSoilMoisture.slice(7 * 24, 8 * 24)
      ),
    };

    weatherData.floodRiskFactors24hThresholded = {
      f01PeakRainFallIntensity:
        weatherData.floodRiskFactors24h.f01PeakRainFallIntensity > 50,
      f02HourlyRainSumNext24Hours:
        weatherData.floodRiskFactors24h.f02HourlyRainSumNext24Hours > 100,
      f03HoursOfRainNext24Hours:
        weatherData.floodRiskFactors24h.f03HoursOfRainNext24Hours > 12,
      f04MeanDeepSoilMoistureNext24Hours:
        weatherData.floodRiskFactors24h.f04MeanDeepSoilMoistureNext24Hours >
        0.3,
    };

    return weatherData;
  }

  static computeLandslideRisk(weatherData) {
    weatherData.landslideRiskFactors24h = weatherData.floodRiskFactors24h;
    weatherData.landslideRiskFactors24h = {
      ...weatherData.landslideRiskFactors24h,
      f05HourlyRainSumPrevious7Days: weatherData.hourlyRainSumPrevious7Days,
    };

    weatherData.landslideRiskFactors24hThresholded = {
      f01PeakRainFallIntensity:
        weatherData.floodRiskFactors24hThresholded.f01PeakRainFallIntensity >
        30,
      f02HourlyRainSumNext24Hours:
        weatherData.floodRiskFactors24hThresholded.f02HourlyRainSumNext24Hours >
        80,
      f03HoursOfRainNext24Hours:
        weatherData.floodRiskFactors24hThresholded.f03HoursOfRainNext24Hours >
        10,
      f04MeanDeepSoilMoistureNext24Hours:
        weatherData.floodRiskFactors24hThresholded
          .f04MeanDeepSoilMoistureNext24Hours > 0.25,
      f05HourlyRainSumPrevious7Days:
        weatherData.landslideRiskFactors24h.f05HourlyRainSumPrevious7Days > 200,
    };

    return weatherData;
  }

  static computerHeatRisk(weatherData) {
    weatherData.heatRiskFactors24h = {
      h01MaxTempNext24Hours: Math.max(
        ...weatherData.hourlyTemp.slice(7 * 24, 8 * 24)
      ),
      h02MeanTempNext24Hours: ArrayUtils.mean(
        weatherData.hourlyTemp.slice(7 * 24, 8 * 24)
      ),
      h03MaxDewPointNext24Hours: Math.max(
        ...weatherData.hourlyDewPoint.slice(7 * 24, 8 * 24)
      ),
    };

    weatherData.heatRiskFactors24hThresholded = {
      h01MaxTempNext24Hours:
        weatherData.heatRiskFactors24h.h01MaxTempNext24Hours > 35,
      h02MeanTempNext24Hours:
        weatherData.heatRiskFactors24h.h02MeanTempNext24Hours > 30,
      h03MaxDewPointNext24Hours:
        weatherData.heatRiskFactors24h.h03MaxDewPointNext24Hours > 25,
    };

    weatherData.heatRiskLevel = Object.values(
      weatherData.heatRiskFactors24hThresholded
    ).filter((v) => v).length;

    weatherData.heatRiskMaxLevel = Object.keys(
      weatherData.heatRiskFactors24hThresholded
    ).length;

    return weatherData;
  }

  static computeDroughtRisk(weatherData) {
    weatherData.droughtRiskFactors24h = {
      d01HourlyRainSumPrevious7Days: weatherData.hourlyRainSumPrevious7Days,
      d02HourlyRainSumNext7Days: weatherData.hourlyRainSumNext7Days,
      d03MeanDeepSoilMoistureNext7Days: ArrayUtils.mean(
        weatherData.hourlyDeepSoilMoisture.slice(7 * 24, 14 * 24)
      ),
      d04HoursOfNoRainNext7Days: weatherData.hourlyRain
        .slice(7 * 24, 14 * 24)
        .filter((rain) => rain < 0.1).length,
    };

    weatherData.droughtRiskFactors24hThresholded = {
      d01HourlyRainSumPrevious7Days:
        weatherData.droughtRiskFactors24h.d01HourlyRainSumPrevious7Days < 0.1,
      d02HourlyRainSumNext7Days:
        weatherData.droughtRiskFactors24h.d02HourlyRainSumNext7Days < 0.1,
      d03MeanDeepSoilMoistureNext7Days:
        weatherData.droughtRiskFactors24h.d03MeanDeepSoilMoistureNext7Days <
        0.25,
      d04HoursOfNoRainNext24Hours:
        weatherData.droughtRiskFactors24h.d04HoursOfNoRainNext24Hours > 0,
    };

    weatherData.droughtRiskLevel = Object.values(
      weatherData.droughtRiskFactors24hThresholded
    ).filter((v) => v).length;

    weatherData.droughtRiskMaxLevel = Object.keys(
      weatherData.droughtRiskFactors24hThresholded
    ).length;

    return weatherData;
  }
}
