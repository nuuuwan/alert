import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import TimeUtils from "../../base/TimeUtils";
import { newTimedUnit } from "../units/TimedUnit";

export default class NaturalDisaster {
  static getLabel(level, maxLevel) {
    if (level === 0) {
      return "No Risk";
    }
    return ["Low Risk", "Medium Risk", "High Risk"][
      parseInt(((level - 1) / (maxLevel - 1)) * 2)
    ];
  }

  static getTsunamiRiskScore({ earthquakeData }) {
    const twentyFourHoursAgo = TimeUtils.getUnixTime() - 24 * 60 * 60;
    const earthequakeDataLast24Hours =
      earthquakeData.filter((eq) => eq.timeUt >= twentyFourHoursAgo) || [];
    const earthquakeAlertData = {
      earthquakeMagnitudePrev24hMax:
        earthequakeDataLast24Hours.length > 0
          ? Math.max(...earthequakeDataLast24Hours.map((eq) => eq.magnitude))
          : 0,
    };

    return new AlertScore({
      name: "Tsunami",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(
            earthquakeAlertData,
            "earthquakeMagnitudePrev24hMax"
          ),
          condition: (value) => value >= 6.5,
          conditionDescription: ">= 6.5",
          source: {
            label: "USGS Earthquake Data (via lk_tsunamis)",
            url: "https://github.com/nuuuwan/lk_tsunamis",
          },
        }),
      ],
    });
  }

  static getLandslideRiskScore({ openMeteoData, openElevationData }) {
    return new AlertScore({
      name: "Landslide",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hMax"),
          condition: (value) => value > 30,
          conditionDescription: "> 30",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hSum"),
          condition: (value) => value > 80,
          conditionDescription: "> 80",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainHoursNext24hSum"),
          condition: (value) => value > 10,
          conditionDescription: "> 10",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(
            openMeteoData,
            "soilMoistureDeepNext24hMean"
          ),
          condition: (value) => value > 0.35,
          conditionDescription: "> 0.35",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainPrev7dSum"),
          condition: (value) => value > 200,
          conditionDescription: "> 200",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openElevationData, "slopeMaxAngle"),
          condition: (value) => value > 15,
          conditionDescription: "> 15",
          source: {
            label: "Open-Elevation API",
            url: "https://open-elevation.com",
          },
        }),
      ],
    });
  }

  static getFloodRiskScore({ openMeteoData, openElevationData }) {
    return new AlertScore({
      name: "Flood",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hMax"),
          condition: (value) => value > 50,
          conditionDescription: "> 50",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hSum"),
          condition: (value) => value > 100,
          conditionDescription: "> 100",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainHoursNext24hSum"),
          condition: (value) => value > 12,
          conditionDescription: "> 12",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(
            openMeteoData,
            "soilMoistureDeepNext24hMean"
          ),
          condition: (value) => value > 0.35,
          conditionDescription: "> 0.35",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openElevationData, "relativeElevation"),
          condition: (value) => value < -5,
          conditionDescription: "< -5",
          source: {
            label: "Open-Elevation API",
            url: "https://open-elevation.com",
          },
        }),
      ],
    });
  }
}
