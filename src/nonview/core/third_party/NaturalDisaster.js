import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import TimeUtils from "../../base/TimeUtils";
import { newTimedUnit } from "../units/TimedUnit";

export default class NaturalDisaster {
  static getLabel(level, maxLevel) {
    if (level < 0 || level > maxLevel) {
      throw new Error(`Level out of bounds: ${level} / ${maxLevel}`);
    }
    return ["No Risk", "Low Risk", "Medium Risk", "High Risk"][
      parseInt((level / maxLevel) * 3)
    ];
  }

  static getTsunamiRiskScore({ earthquakeData }) {
    const twentyFourHoursAgo = TimeUtils.getUnixTime() - 24 * 60 * 60;
    const earthequakeDataLast24Hours = earthquakeData.filter(
      (eq) => eq.timeUt >= twentyFourHoursAgo
    );
    const earthquakeAlertData = {
      earthquakeMagnitudePrev24hMax: earthequakeDataLast24Hours
        ? Math.max(...earthequakeDataLast24Hours.map((eq) => eq.magnitude))
        : 0,
    };

    return new AlertScore({
      name: "Tsunami",
      description: "Risk of the location experiencing a tsunami event.",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(
            earthquakeAlertData,
            "earthquakeMagnitudePrev24hMax"
          ),
          condition: (value) => value >= 6.5,
          conditionDescription: "Greater than or equal to 6.5",
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
      description: "Risk of the location experiencing a landslide event.",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hMax"),
          condition: (value) => value > 30,
          conditionDescription: "Greater than 30 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hSum"),
          condition: (value) => value > 80,
          conditionDescription: "Greater than 80 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainHoursNext24hSum"),
          condition: (value) => value > 10,
          conditionDescription: "Greater than 10 hours",
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
          condition: (value) => value > 0.25,
          conditionDescription: "Greater than 0.25",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainPrev7dSum"),
          condition: (value) => value > 200,
          conditionDescription: "Greater than 200 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openElevationData, "slopeMaxAngle"),
          condition: (value) => value > 15,
          conditionDescription: "Greater than 15 degrees",
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
      description: "Risk of the location experiencing a flood event.",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hMax"),
          condition: (value) => value > 50,
          conditionDescription: "Greater than 50 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainNext24hSum"),
          condition: (value) => value > 100,
          conditionDescription: "Greater than 100 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openMeteoData, "rainHoursNext24hSum"),
          condition: (value) => value > 12,
          conditionDescription: "Greater than 12 hours",
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
          condition: (value) => value > 0.3,
          conditionDescription: "Greater than 0.3",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          timedUnitValue: newTimedUnit(openElevationData, "relativeElevation"),
          condition: (value) => value < -5,
          conditionDescription: "Less than -5 meters",
          source: {
            label: "Open-Elevation API",
            url: "https://open-elevation.com",
          },
        }),
      ],
    });
  }
}
