export default class NaturalDisaster {
  static computeLandslideRiskData({ openMeteoData, openElevationData }) {
    console.debug({ openElevationData });
    let landslideRiskFactors24hThresholded = {
      ...openMeteoData.landslideRiskFactors24hThresholded,
    };

    landslideRiskFactors24hThresholded.f06Slope =
      openElevationData.slopeData.slopeAngle > 22.5;

    const landslideRiskScore = Object.values(
      landslideRiskFactors24hThresholded
    ).filter((v) => v).length;
    const landslideRiskScoreTotal = 6;
    const landslideRiskLabel = [
      "Low",
      "Low",
      "Moderate",
      "Moderate",
      "High",
      "High",
      "Extreme",
    ][landslideRiskScore];

    const landslideRiskData = {
      landslideRiskScore,
      landslideRiskScoreTotal,
      landslideRiskLabel,
    };
    return landslideRiskData;
  }

  static getData({ openMeteoData, openElevationData }) {
    return {
      landslideRiskData: this.computeLandslideRiskData({
        openMeteoData,
        openElevationData,
      }),
    };
  }
}
