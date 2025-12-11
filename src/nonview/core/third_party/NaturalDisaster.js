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
    console.debug({ openElevationData });
    let landslideRiskFactors24hThresholded = {
      ...openMeteoData.landslideRiskFactors24hThresholded,
    };

    landslideRiskFactors24hThresholded.f06Slope =
      openElevationData.slopeData.slopeAngle > 22.5;

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

  static getData({ openMeteoData, openElevationData }) {
    return {
      landslideRiskData: this.computeLandslideRiskData({
        openMeteoData,
        openElevationData,
      }),
      floodRiskData: this.computeFloodRiskData({
        openMeteoData,
        openElevationData,
      }),
    };
  }
}
