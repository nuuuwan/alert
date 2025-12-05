import { fetchWeatherApi } from "openmeteo";
export default class OpenMeteo {
  static async getData({ latLng }) {
    const params = {
      latitude: latLng[0],
      longitude: latLng[1],
      daily: "uv_index_max",
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "dew_point_2m",
        "rain",
        "weather_code",
        "visibility",
        "evapotranspiration",
        "wind_speed_10m",
        "soil_moisture_0_to_1cm",
        "soil_moisture_27_to_81cm",
      ],

      timezone: "Asia/Colombo",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const hourly = response.hourly();
    const daily = response.daily();

    const weatherData = {
      hourly: {
        temperature_2m: hourly.variables(0).valuesArray(),
        relative_humidity_2m: hourly.variables(1).valuesArray(),
        dew_point_2m: hourly.variables(2).valuesArray(),
        rain: hourly.variables(3).valuesArray(),
        weather_code: hourly.variables(4).valuesArray(),
        visibility: hourly.variables(5).valuesArray(),
        evapotranspiration: hourly.variables(6).valuesArray(),
        wind_speed_10m: hourly.variables(7).valuesArray(),
        soil_moisture_0_to_1cm: hourly.variables(8).valuesArray(),
        soil_moisture_27_to_81cm: hourly.variables(9).valuesArray(),
      },
      daily: {
        uv_index_max: daily.variables(0).valuesArray(),
      },
    };

    return weatherData;
  }
}
