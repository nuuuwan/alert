import HydrometricStation from "./ents/places/HydrometricStation";
import City from "./ents/places/City";
import Hospital from "./ents/places/Hospital";
import PoliceStation from "./ents/places/PoliceStation";
import FireStation from "./ents/places/FireStation";

export default class Nearby {
  static async findNearbyPlaces(latLng, radius = 500_000, limit = 6) {
    const allHydrometricStations = await HydrometricStation.loadAll();
    const allCities = await City.loadAll();
    const allHospitals = await Hospital.loadAll();
    const allPoliceStations = await PoliceStation.loadAll();
    const allFireStations = await FireStation.loadAll();
    const allPlaces = [
      ...allHydrometricStations,
      ...allCities,
      ...allHospitals,
      ...allPoliceStations,
      ...allFireStations,
    ];
    const EPSILON = 0.0001;
    return allPlaces
      .map((place) => [place, place.latLng.distanceTo(latLng)])
      .sort((a, b) => a[1] - b[1])
      .filter(([, distance]) => distance <= radius && distance > EPSILON)
      .slice(0, limit);
  }
}
