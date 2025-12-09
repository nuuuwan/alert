import HydrometricStation from "./ents/places/HydrometricStation";
import City from "./ents/places/City";

export default class Nearby {
  static async findNearbyHydrometricStations(
    latLng,
    radius = 500_000,
    limit = 3,
  ) {
    const allHydrometricStations = await HydrometricStation.loadAll();
    const allCities = await City.loadAll();
    const allPlaces = [...allHydrometricStations, ...allCities];
    const EPSILON = 0.0001;
    return allPlaces
      .map((place) => [place, place.latLng.distanceTo(latLng)])
      .sort((a, b) => a[1] - b[1])
      .filter(([, distance]) => distance <= radius && distance > EPSILON)
      .slice(0, limit);
  }
}
