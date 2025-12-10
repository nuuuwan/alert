export default class NaturalDisaster {
  static computeLandslideRiskData({ openMeteoData, openElevationData }) {
    console.debug({ openElevationData });
    let landslideRiskFactors24hThresholded = {
      ...openMeteoData.landslideRiskFactors24hThresholded,
    };

    landslideRiskFactors24hThresholded.f06Slope =
      openElevationData.slopeData.slopeAngle > 22.5;

    const landslideRiskScore = Object.values(
      landslideRiskFactors24hThresholded,
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

  static computeFloodRiskData({ openMeteoData, openElevationData }) {
    let floodRiskFactors24hThresholded = {
      ...openMeteoData.floodRiskFactors24hThresholded,
    };
    floodRiskFactors24hThresholded.f05RelativeElevation =
      openElevationData.relativeElevationData.relativeElevation < -5;

    const floodRiskScore = Object.values(floodRiskFactors24hThresholded).filter(
      (v) => v,
    ).length;
    const floodRiskScoreTotal = 5;
    const floodRiskLabel = [
      "Low",
      "Low",
      "Moderate",
      "Moderate",
      "High",
      "Extreme",
    ][floodRiskScore];
    const floodRiskData = {
      floodRiskScore,
      floodRiskScoreTotal,
      floodRiskLabel,
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
