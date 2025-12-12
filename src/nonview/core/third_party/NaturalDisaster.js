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
      openElevationData.slopeData.slopeAngle > 22.5;

    const landslideRiskLevel = Object.values(
      landslideRiskFactors24hThresholded,
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
      (v) => v,
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
      (eq) => eq.timeUt >= twentyFourHoursAgo,
    );

    const tsunamiRiskFactors = {
      f01EarthquakeMagnitudeLast24HoursMax: Math.max(
        ...recentEarthquakes.map((eq) => eq.magnitude || 0),
      ),
    };

    const tsunamiRiskFactorsThresholded = {
      f01EarthquakeMagnitudeLast24HoursMax:
        tsunamiRiskFactors.f01EarthquakeMagnitudeLast24HoursMax >= 6.5,
    };

    const tsunamiRiskLevel = Object.values(
      tsunamiRiskFactorsThresholded,
    ).filter((v) => v).length;
    const tsunamiRiskMaxLevel = 1;
    const tsunamiRiskData = {
      tsunamiRiskLevel,
      tsunamiRiskMaxLevel,
    };
    return tsunamiRiskData;
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
