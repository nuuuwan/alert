import WWW from "../../base/WWW";
import Cache from "../../base/Cache";
import DataSource from "../DataSource";

export default class OpenElevation {
  static getDataSource() {
    return new DataSource({
      label: "Open-Elevation (Free Elevation API)",
      url: `https://open-elevation.com/#api-docs`,
    });
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

  static __buildNeighbourhood__(latLng, e) {
    const offsets = [-e, 0, e];
    const pts = [];

    for (const dlat of offsets) {
      for (const dlng of offsets) {
        pts.push({ lat: latLng.lat + dlat, lng: latLng.lng + dlng });
      }
    }
    return pts;
  }

  static __getHaversine__(a, b) {
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
    let slopeMax = 0;
    for (let i = 0; i < elevations.length; i++) {
      if (i === centreIndex) continue;

      const hi = elevations[i];
      const dh = Math.abs(hi - h0);

      const d = this.__getHaversine__(pts[i], pts[centreIndex]);
      if (d === 0) continue;

      const slope = dh / d;
      if (slope > slopeMax) slopeMax = slope;
    }

    const slopeMaxAngle = Math.atan(slopeMax) * (180 / Math.PI);

    return {
      slopeMax,
      slopeMaxAngle,
    };
  }

  static getRelativeElevationData(elevations) {
    const centreIndex = 4;
    const h0 = elevations[centreIndex];

    const neighbours = elevations.filter((_, i) => i !== centreIndex);
    const elevationNeighbourMean =
      neighbours.reduce((a, b) => a + b, 0) / neighbours.length;

    const relativeElevation = h0 - elevationNeighbourMean;

    return {
      elevationNeighbourMean,
      relativeElevation,
    };
  }

  static async getData(latLng, neighbourDistanceM = 100) {
    const e = (0.0001 * neighbourDistanceM) / 11.1;
    const pts = this.__buildNeighbourhood__(latLng, e);
    const elevations = await this.getElevationList(pts);

    const relativeElevationData = this.getRelativeElevationData(elevations);
    const slopeData = this.getSlopeData(pts, elevations);

    return {
      elevationM: elevations[4],
      pts,
      elevations,
      ...relativeElevationData,
      ...slopeData,
    };
  }
}
