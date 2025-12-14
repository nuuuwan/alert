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

  static computeLandslideRiskData({ openMeteoData, openElevationData }) {
    let landslideRiskFactors24hThresholded = {
      ...openMeteoData.landslideRiskFactors24hThresholded,
    };

    landslideRiskFactors24hThresholded.f06Slope =
      openElevationData.slopeData.maxSlopeAngle > 22.5;

    const landslideRiskLevel = Object.values(
      landslideRiskFactors24hThresholded
    ).filter((v) => v).length;
    const landslideRiskMaxLevel = 6;
    const landslideRiskData = {
      landslideRiskLevel,
      landslideRiskMaxLevel,
    };
    return landslideRiskData;
  }

  static computeFloodRiskData({ openMeteoData, openElevationData }) {
    let floodRiskFactors24hThresholded = {
      ...openMeteoData.floodRiskFactors24hThresholded,
    };
    floodRiskFactors24hThresholded.f05RelativeElevation =
      openElevationData.relativeElevationData.relativeElevation < -5;

    const floodRiskLevel = Object.values(floodRiskFactors24hThresholded).filter(
      (v) => v
    ).length;
    const floodRiskMaxLevel = 5;
    const floodRiskData = {
      floodRiskLevel,
      floodRiskMaxLevel,
    };
    return floodRiskData;
  }

  static computeHeatRiskData({ openMeteoData }) {
    const heatRiskLevel = openMeteoData.heatRiskLevel;
    const heatRiskMaxLevel = openMeteoData.heatRiskMaxLevel;
    const heatRiskData = {
      heatRiskLevel,
      heatRiskMaxLevel,
    };
    return heatRiskData;
  }

  static computeDroughtRiskData({ openMeteoData }) {
    const droughtRiskLevel = openMeteoData.droughtRiskLevel;
    const droughtRiskMaxLevel = openMeteoData.droughtRiskMaxLevel;
    const droughtRiskData = {
      droughtRiskLevel,
      droughtRiskMaxLevel,
    };
    return droughtRiskData;
  }

  static computeTsunamiRiskData({ earthquakeData }) {
    const twentyFourHoursAgo = Date.now() / 1000 - 24 * 60 * 60;
    const recentEarthquakes = earthquakeData.filter(
      (eq) => eq.timeUt >= twentyFourHoursAgo
    );

    const tsunamiRiskFactors = {
      f01EarthquakeMagnitudeLast24HoursMax: Math.max(
        ...recentEarthquakes.map((eq) => eq.magnitude || 0)
      ),
    };

    const tsunamiRiskFactorsThresholded = {
      f01EarthquakeMagnitudeLast24HoursMax:
        tsunamiRiskFactors.f01EarthquakeMagnitudeLast24HoursMax >= 6.5,
    };

    const tsunamiRiskLevel = Object.values(
      tsunamiRiskFactorsThresholded
    ).filter((v) => v).length;
    const tsunamiRiskMaxLevel = 1;
    const tsunamiRiskData = {
      tsunamiRiskLevel,
      tsunamiRiskMaxLevel,
    };
    return tsunamiRiskData;
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
          unit: "",
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
            unitValue: new Rain(
              openMeteoData.landslideRiskFactors24h.f01PeakRainFallIntensity
            ),
          }),
          condition: (value) => value > 30,
          conditionDescription: "Peak rainfall intensity greater than 30 mm/h",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "mm/h",
        }),
        new AlertScoreMetric({
          name: "Total Rainfall Next 24h",
          description: "Total rainfall forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new Rain(
              openMeteoData.landslideRiskFactors24h.f02HourlyRainSumNext24Hours
            ),
          }),
          condition: (value) => value > 80,
          conditionDescription: "Total rainfall greater than 80 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "mm",
        }),
        new AlertScoreMetric({
          name: "Hours of Rain",
          description: "Number of hours with rainfall in the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new RainHours(
              openMeteoData.landslideRiskFactors24h.f03HoursOfRainNext24Hours
            ),
          }),
          condition: (value) => value > 10,
          conditionDescription: "Hours of rain greater than 10 hours",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "h",
        }),
        new AlertScoreMetric({
          name: "Mean Soil Moisture",
          description: "Mean deep soil moisture for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h mean",
            unitValue: new SoilMoisture(
              openMeteoData.landslideRiskFactors24h.f04MeanDeepSoilMoistureNext24Hours
            ),
          }),
          condition: (value) => value > 0.25,
          conditionDescription: "Mean soil moisture greater than 0.25",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "m³/m³",
        }),
        new AlertScoreMetric({
          name: "Rainfall Prev. 7 Days",
          description: "Total rainfall recorded in the previous 7 days.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Prev. 7 days sum",
            unitValue: new Rain(
              openMeteoData.landslideRiskFactors24h.f05HourlyRainSumPrevious7Days
            ),
          }),
          condition: (value) => value > 200,
          conditionDescription: "Rainfall greater than 200 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "mm",
        }),
        new AlertScoreMetric({
          name: "Slope Angle",
          description: "Slope angle of the location.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Static",
            unitValue: new Slope(openElevationData.slopeData.maxSlopeAngle),
          }),
          condition: (value) => value > 22.5,
          conditionDescription: "Slope angle greater than 22.5 degrees",
          source: {
            label: "Open-Elevation API",
            url: "https://open-elevation.com",
          },
          unit: "°",
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
            unitValue: new Rain(
              openMeteoData.floodRiskFactors24h.f01PeakRainFallIntensity
            ),
          }),
          condition: (value) => value > 50,
          conditionDescription: "Peak rainfall intensity greater than 50 mm/h",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "mm/h",
        }),
        new AlertScoreMetric({
          name: "Total Rainfall Next 24h",
          description: "Total rainfall forecasted for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new Rain(
              openMeteoData.floodRiskFactors24h.f02HourlyRainSumNext24Hours
            ),
          }),
          condition: (value) => value > 100,
          conditionDescription: "Total rainfall greater than 100 mm",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "mm",
        }),
        new AlertScoreMetric({
          name: "Hours of Rain",
          description: "Number of hours with rainfall in the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h sum",
            unitValue: new RainHours(
              openMeteoData.floodRiskFactors24h.f03HoursOfRainNext24Hours
            ),
          }),
          condition: (value) => value > 12,
          conditionDescription: "Hours of rain greater than 12 hours",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "h",
        }),
        new AlertScoreMetric({
          name: "Mean Soil Moisture",
          description: "Mean deep soil moisture for the next 24 hours.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Next 24h mean",
            unitValue: new SoilMoisture(
              openMeteoData.floodRiskFactors24h.f04MeanDeepSoilMoistureNext24Hours
            ),
          }),
          condition: (value) => value > 0.3,
          conditionDescription: "Mean soil moisture greater than 0.3",
          source: {
            label: "Open-Meteo Weather API",
            url: "https://open-meteo.com",
          },
          unit: "m³/m³",
        }),
        new AlertScoreMetric({
          name: "Relative Elevation",
          description: "Relative elevation of the location.",
          timedUnitValue: new TimedUnit({
            timeLabel: "Static",
            unitValue: new RelativeElevation(
              openElevationData.relativeElevationData.relativeElevation
            ),
          }),
          condition: (value) => value < -5,
          conditionDescription: "Relative elevation lower than -5 meters",
          source: {
            label: "Open-Elevation API",
            url: "https://open-elevation.com",
          },
          unit: "m",
        }),
      ],
    });
  }

  static getData({ openMeteoData, openElevationData, earthquakeData }) {
    return {
      landslideRiskData: this.computeLandslideRiskData({
        openMeteoData,
        openElevationData,
      }),
      floodRiskData: this.computeFloodRiskData({
        openMeteoData,
        openElevationData,
      }),
      heatRiskData: this.computeHeatRiskData({
        openMeteoData,
      }),
      droughtRiskData: this.computeDroughtRiskData({
        openMeteoData,
      }),
      tsunamiRiskData: this.computeTsunamiRiskData({
        earthquakeData,
      }),
    };
  }
}
