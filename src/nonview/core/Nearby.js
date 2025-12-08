import HydrometricStation from "./ents/places/HydrometricStation";

export default class Nearby {
  static async findNearbyHydrometricStations(
    latLng,
    radius = 20000,
    limit = 3
  ) {
    const allHydrometricStations = await HydrometricStation.loadAll();
    return allHydrometricStations
      .map((station) => [station, station.latLng.distanceTo(latLng)])
      .sort((a, b) => a[1] - b[1])
      .filter(([, distance]) => distance <= radius)
      .slice(0, limit);
  }
}
