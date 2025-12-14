import AlertScore from "../alerts/AlertScore";
import AlertScoreMetric from "../alerts/AlertScoreMetric";
import TimeUtils from "../../base/TimeUtils";
import Rain from "../units/Rain";
import EarthquakeMagnitude from "../units/EarthquakeMagnitude";
import SoilMoisture from "../units/SoilMoisture";
import Slope from "../units/Slope";
import RelativeElevation from "../units/RelativeElevation";
import TimedUnit from "../units/TimedUnit";
import RainHours from "../units/RainHours";

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

    return new AlertScore({
      name: "Tsunami",
      description: "Risk of the location experiencing a tsunami event.",
      timeLabel: "Next 24h",
      metricList: [
        new AlertScoreMetric({
          name: "Magnitude",
          description:
            "Maximum earthquake magnitude recorded in the last 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Prev. 24h max",
            unitValue: new EarthquakeMagnitude(
              Math.max(
                ...earthequakeDataLast24Hours.map((eq) => eq.magnitude || 0),
                ...[0]
              )
            ),
          }),
          condition: (value) => value >= 6.5,
          conditionDescription:
            "Magnitude of earthquake greater than or equal to 6.5",
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
          name: "Peak Rainfall Intensity",
          description: "Maximum hourly rainfall intensity.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h max",
            unitValue: new Rain(openMeteoData.rainNext24hMax),
          }),
          condition: (value) => value > 30,
          conditionDescription: "Greater than 30 mm/h",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Total Rainfall Next 24h",
          description: "Total rainfall forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new Rain(openMeteoData.rainNext24hSum),
          }),
          condition: (value) => value > 80,
          conditionDescription: "Greater than 80 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Hours of Rain",
          description: "Number of hours with rainfall in the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new RainHours(openMeteoData.rainHoursNext24hSum),
          }),
          condition: (value) => value > 10,
          conditionDescription: "Greater than 10 hours",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Mean Soil Moisture",
          description: "Mean deep soil moisture for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h mean",
            unitValue: new SoilMoisture(
              openMeteoData.soilMoistureDeepNext24hMean
            ),
          }),
          condition: (value) => value > 0.25,
          conditionDescription: "Greater than 0.25",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Rainfall Prev. 7 Days",
          description: "Total rainfall recorded in the previous 7d.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Prev. 7d sum",
            unitValue: new Rain(openMeteoData.rainPrev7dSum),
          }),
          condition: (value) => value > 200,
          conditionDescription: "Greater than 200 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Slope Angle",
          description: "Slope angle of the location.",
          timedUnitValue: new TimedUnit({
            timeLabel: "",
            unitValue: new Slope(openElevationData.slopeData.slopeMaxAngle),
          }),
          condition: (value) => value > 22.5,
          conditionDescription: "Greater than 22.5 degrees",
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
          name: "Peak Rainfall Intensity",
          description: "Maximum hourly rainfall intensity.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h max",
            unitValue: new Rain(openMeteoData.rainNext24hMax),
          }),
          condition: (value) => value > 50,
          conditionDescription: "Greater than 50 mm/h",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Total Rainfall Next 24h",
          description: "Total rainfall forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new Rain(openMeteoData.rainNext24hSum),
          }),
          condition: (value) => value > 100,
          conditionDescription: "Greater than 100 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Hours of Rain",
          description: "Number of hours with rainfall in the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new RainHours(openMeteoData.rainHoursNext24hSum),
          }),
          condition: (value) => value > 12,
          conditionDescription: "Greater than 12 hours",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Mean Soil Moisture",
          description: "Mean deep soil moisture for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h mean",
            unitValue: new SoilMoisture(
              openMeteoData.soilMoistureDeepNext24hMean
            ),
          }),
          condition: (value) => value > 0.3,
          conditionDescription: "Greater than 0.3",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
        }),
        new AlertScoreMetric({
          name: "Relative Elevation",
          description: "Relative elevation of the location.",
          timedUnitValue: new TimedUnit({
            timeLabel: "",
            unitValue: new RelativeElevation(
              openElevationData.relativeElevationData.relativeElevation
            ),
          }),
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
