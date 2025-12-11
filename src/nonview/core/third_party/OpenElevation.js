import WWW from "../../base/WWW";
import Cache from "../../base/Cache";
import SystemMode from "../../base/SystemMode";

export default class OpenElevation {
  static getSourceList() {
    return [
      {
        label: "Open-Elevation (Free Elevation API)",
        url: `https://open-elevation.com/#api-docs`,
      },
    ];
  }

  static getTestData() {
    return {
      elevationM: 123,
      relativeElevationData: {
        meanNeighbours: 130,
        relativeElevation: -7,
        lowGroundDangerLevel: 2,
      },
      slopeData: {
        maxSlope: 0.15,
        slopeAngle: 8.53,
        slopeDangerLevel: 1,
      },
    };
  }

  static async getData(latLng, neighbourDistanceM = 100) {
    if (SystemMode.isTest()) {
      return this.getTestData();
    }

    const e = (0.0001 * neighbourDistanceM) / 11.1;
    const pts = this._buildNeighbourhood(latLng, e);
    const elevations = await this.getElevationList(pts);

    const relativeElevationData = this.getRelativeElevationData(elevations);
    const slopeData = this.getSlopeData(pts, elevations);

    return {
      elevationM: elevations[4],
      relativeElevationData,
      slopeData,
      pts,
      elevations,
    };
  }
  static async getElevationList(latLngList) {
    const locations = latLngList
      .map((latLng) => `${latLng.lat},${latLng.lng}`)
      .join("|");

    const url = `https://api.open-elevation.com/api/v1/lookup?locations=${locations}`;
    const responseJSON = await Cache.get(
      `OpenElevation:${locations}`,
      async () => {
        const response = await WWW.fetchJSON(url);
        return JSON.stringify(response);
      },
    );
    const response = JSON.parse(responseJSON);
    return response.results.map((result) => result.elevation);
  }

  static _buildNeighbourhood(latLng, e) {
    const offsets = [-e, 0, e];
    const pts = [];

    for (const dlat of offsets) {
      for (const dlng of offsets) {
        pts.push({ lat: latLng.lat + dlat, lng: latLng.lng + dlng });
      }
    }
    return pts;
  }

  static _haversine(a, b) {
    const R = 6371000; // metres
    const toRad = (x) => (x * Math.PI) / 180;

    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);

    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(h));
  }

  static getSlopeData(pts, elevations) {
    const centreIndex = 4;
    const h0 = elevations[centreIndex];
    let maxSlope = 0;
    for (let i = 0; i < elevations.length; i++) {
      if (i === centreIndex) continue;

      const hi = elevations[i];
      const dh = Math.abs(hi - h0);

      const d = this._haversine(pts[i], pts[centreIndex]);
      if (d === 0) continue;

      const slope = dh / d;
      if (slope > maxSlope) maxSlope = slope;
    }

    const slopeAngle = Math.atan(maxSlope) * (180 / Math.PI);
    let slopeDangerLevel = 0;
    if (slopeAngle >= 22.5) {
      slopeDangerLevel = 3;
    } else if (slopeAngle >= 15) {
      slopeDangerLevel = 2;
    } else if (slopeAngle >= 7.5) {
      slopeDangerLevel = 1;
    }

    return {
      maxSlope,
      slopeAngle,
      slopeDangerLevel,
    };
  }

  static getRelativeElevationData(elevations) {
    const centreIndex = 4;
    const h0 = elevations[centreIndex];

    const neighbours = elevations.filter((_, i) => i !== centreIndex);
    const meanNeighbours =
      neighbours.reduce((a, b) => a + b, 0) / neighbours.length;

    const relativeElevation = h0 - meanNeighbours;

    let lowGroundDangerLevel = 0;
    if (relativeElevation < -10) {
      lowGroundDangerLevel = 3;
    } else if (relativeElevation < -5) {
      lowGroundDangerLevel = 2;
    } else if (relativeElevation < -2) {
      lowGroundDangerLevel = 1;
    }

    return {
      meanNeighbours,
      relativeElevation,
      lowGroundDangerLevel,
    };
  }
}
