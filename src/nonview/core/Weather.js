import { Cache, DataWithTimeMixin } from "../base";

class Weather {
  constructor(data) {
    this.locationName = data.locationName || data.place;
    this.timeUt = data.timeUt;
    this.rainMM = data.rainMM || data.rain;
    this.tempMin = data.tempMin || data.min_temp;
    this.tempMax = data.tempMax || data.max_temp;
  }

  static async listAll() {
    const latest = await Cache.get("weather.listAll", async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nuuuwan/weather_lk/refs/heads/data/list_all.json",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawDataList = await response.json();
        const latest = rawDataList[rawDataList.length - 1];
        return latest;
      } catch (error) {
        console.error("Error loading weather data:", error);
        return [];
      }
    });
    const weatherList = latest.weather_list;
    const timeUt = latest.date_ut + 8 * 3_600;
    return weatherList.map(
      (weatherData) => new Weather({ ...weatherData, timeUt }),
    );
  }

  static async idx() {
    const list = await this.listAll();
    return Object.fromEntries(
      list.map((weather) => [weather.locationName, weather]),
    );
  }
}

Object.assign(Weather.prototype, DataWithTimeMixin);

export default Weather;
